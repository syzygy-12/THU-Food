package Utils

import cats.effect.IO
import io.circe.generic.auto.*
import io.circe.Json
import Common.API.PlanContext
import Common.DBAPI.readDBRows
import Common.Object.SqlParameter
import Common.ServiceUtils.schemaName
import Models.UserLoginResponse
import Utils.TokenCreateUtils.createToken


object UserLoginUtils {
  def userLogin(userName: String, password: String)(using planContext: PlanContext): IO[UserLoginResponse] = {

    val result = readDBRows(
      s"SELECT id, authority FROM \"${schemaName}\".user_info WHERE username = ? AND password = ?",
      List(SqlParameter("String", userName), SqlParameter("String", password))
    )

    result.flatMap {
      case rows =>
        // 用户有效，提取 id 和 authority 并返回 JSON 字符串
        rows.headOption match {
          case Some(row) =>
            val id = row.hcursor.get[Int]("id").getOrElse(-1)
            val authority = row.hcursor.get[Int]("authority").getOrElse(-1)

            createToken(id, authority).attempt.flatMap {
              case Right(token) =>
                IO.pure(UserLoginResponse(valid = true, Some(id), Some(token)))
              case Left(_) =>
                IO.pure(UserLoginResponse(valid = false))
            }
          case None =>
            IO.pure(UserLoginResponse(valid = false))
        }
    }
  }
}
