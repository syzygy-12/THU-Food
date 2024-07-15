package Utils

import cats.effect.IO
import io.circe.generic.auto.*
import io.circe.Json
import Common.API.{PlanContext, Planner}
import Common.DBAPI.{readDBRows, readDBString}
import Common.Object.SqlParameter
import Common.ServiceUtils.schemaName
import Models.UserLoginResponse
import Utils.TokenCreateUtils.createToken

// 定义一个 case class 来表示登录响应
object UserLoginUtils {
  def userLogin (userName: String, password: String)(using planContext: PlanContext) : IO[UserLoginResponse] = {
    // 尝试通过从数据库读取行来验证用户
    val result = readDBRows(
      s"SELECT id, authority FROM \"${schemaName}\".user_info WHERE username = ? AND password = ?",
      List(SqlParameter("String", userName), SqlParameter("String", password))
    )

    result.map {
      case rows =>
        // 用户有效，提取 id 和 authority 并返回 JSON 字符串
        rows.headOption match {
          case Some(row) =>
            // 解析 JSON 对象
            val id = row.hcursor.get[Int]("id").getOrElse(-1)
            val authority = row.hcursor.get[Int]("authority").getOrElse(-1)
            val token = createToken(id, authority)
            UserLoginResponse(valid = true, Some(id), Some(token))
          case None =>
            UserLoginResponse(valid = false)
        }
    }
  }
}
