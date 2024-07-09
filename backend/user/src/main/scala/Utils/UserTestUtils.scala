package Utils

import Common.API.PlanContext
import Common.DBAPI.{readDBBoolean, readDBRows}
import Common.Object.SqlParameter
import Common.ServiceUtils.schemaName
import cats.effect.IO

object UserTestUtils {
  def userTest(userName: String)(using planContext: PlanContext) : IO[Boolean] = {
    readDBBoolean(s"SELECT EXISTS(SELECT 1 FROM \"${schemaName}\".user_info WHERE username = ?)",
      List(SqlParameter("String", userName))
    )
  }
}