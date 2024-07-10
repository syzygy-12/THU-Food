package Impl

import cats.effect.IO
import io.circe.generic.auto.*
import io.circe.syntax.*
import io.circe.Json
import io.circe.parser.*
import Common.API.{PlanContext, Planner}
import Common.DBAPI.{readDBRows, readDBString}
import Common.Object.SqlParameter
import Common.ServiceUtils.schemaName

// 定义一个 case class 来表示登录响应
case class UserLoginResponse(valid: Boolean, id: Option[Int] = None, authority: Option[Int] = None)

case class UserLoginMessagePlanner(userName: String, password: String, override val planContext: PlanContext) extends Planner[String]:
  override def plan(using PlanContext): IO[String] = {
    // 尝试通过从数据库读取行来验证用户
    readDBRows(
      s"SELECT id, authority FROM \"${schemaName}\".user_info WHERE username = ? AND password = ?",
      List(SqlParameter("String", userName), SqlParameter("String", password))
    ).map {
      case Nil =>
        // 用户无效，返回 JSON 字符串
        UserLoginResponse(valid = false).asJson.noSpaces
      case rows =>
        // 用户有效，提取 id 和 authority 并返回 JSON 字符串
        rows.headOption match {
          case Some(row) =>
            // 解析 JSON 对象
            val id = row.hcursor.get[Int]("id").getOrElse(-1)
            val authority = row.hcursor.get[Int]("authority").getOrElse(-1)
            UserLoginResponse(valid = true, Some(id), Some(authority)).asJson.noSpaces
          case None =>
            UserLoginResponse(valid = false).asJson.noSpaces
        }
    }
}
