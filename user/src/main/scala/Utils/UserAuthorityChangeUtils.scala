package Utils

import Common.API.PlanContext
import Common.DBAPI.{readDBBoolean, readDBRows, writeDB}
import Common.Object.SqlParameter
import Common.ServiceUtils.schemaName
import cats.effect.IO
import io.circe.generic.auto.deriveEncoder

object UserAuthorityChangeUtils {
  def userAuthorityChange(userName: String, newAuthority: Int)(using planContext: PlanContext) : IO[Boolean] = {
    readDBBoolean(
      s"SELECT EXISTS(SELECT 1 FROM \"${schemaName}\".user_info WHERE username = ?)",
      List(SqlParameter("String", userName))
    ).flatMap { exist =>
      if (exist) {
        val updateQuery = s"UPDATE \"${schemaName}\".user_info SET authority = ? WHERE username = ?"
        val updateParameters = List(
          SqlParameter("Int", newAuthority.toString),
          SqlParameter("String", userName)
        )
        writeDB(updateQuery, updateParameters).map(_ => true)
      } else {
        IO(false)
      }
    }
  }
}