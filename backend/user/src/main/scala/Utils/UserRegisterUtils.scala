package Utils

import cats.effect.IO
import io.circe.generic.auto.*
import io.circe.Json
import Common.API.PlanContext
import Common.DBAPI.*
import Common.Object.SqlParameter
import Common.ServiceUtils.schemaName
import Utils.UserTestUtils.userTest

// 定义一个 case class 来表示登录响应
object UserRegisterUtils {
  def userRegister(userName: String, password: String)(using planContext: PlanContext) : IO[Boolean] = {

    // Check if the user is already registered
    val checkUserExists = readDBBoolean(s"SELECT EXISTS(SELECT 1 FROM \"${schemaName}\".user_info WHERE username = ?)",
      List(SqlParameter("String", userName))
    )

    checkUserExists.flatMap { exists =>
      if (exists) {
        IO(false)
      } else {
        val query = s"INSERT INTO \"${schemaName}\".user_info (username, password, authority, \"commentIdList\") VALUES (?, ?, 0, '{}') RETURNING id"
        val parameters = List(
          SqlParameter("String", userName),
          SqlParameter("String", password),
        )
        readDBRows(query, parameters).flatMap {
          case head :: _ =>
            IO(true)
          case _ =>
            IO.raiseError(new Exception("Insert operation failed"))
        }
      }
    }
  }
}
