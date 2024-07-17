package Utils

import Common.API.PlanContext
import Common.DBAPI.*
import Common.Object.SqlParameter
import Common.ServiceUtils.schemaName
import cats.effect.IO
import io.circe.generic.auto.*

object UserPasswordChangeUtils {
  def userPasswordChange(userId: Int, password: String, newPassword: String)(using planContext: PlanContext): IO[Boolean] = {

    readDBBoolean(
      s"SELECT EXISTS(SELECT 1 FROM \"${schemaName}\".user_info WHERE id = ? AND password = ?)",
      List(
        SqlParameter("Int", userId.toString),
        SqlParameter("String", password)
      )
    ).flatMap { exist =>
      if (exist) {
        val updateQuery = s"UPDATE \"${schemaName}\".user_info SET password = ? WHERE id = ?"
        val updateParameters = List(
          SqlParameter("String", newPassword),
          SqlParameter("Int", userId.toString)
        )
        writeDB(updateQuery, updateParameters).map(_ => true)
      } else {
        IO(false)
      }
    }
  }
}