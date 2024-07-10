package Utils

import Common.API.PlanContext
import Common.DBAPI.*
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import cats.effect.IO

object StarTestUtils {
  def testStar(userId: Int, entryId: Int, starType: Int)(using planContext: PlanContext): IO[Boolean] = {
    readDBBoolean(s"SELECT EXISTS(SELECT 1 FROM ${schemaName}.${tableName} WHERE userid = ? AND objectid = ? AND startype = ?)",
      List(
        SqlParameter("Int", userId.toString),
        SqlParameter("Int", entryId.toString),
        SqlParameter("Int", starType.toString),
      )
    )
  }
}
