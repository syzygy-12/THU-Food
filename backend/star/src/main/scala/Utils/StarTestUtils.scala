package Utils

import Common.API.PlanContext
import Common.DBAPI.*
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import cats.effect.IO
import io.circe.Json
import io.circe.generic.auto.*

object StarTestUtils {

  def testStar(userId: Int, entryId: Int)(using planContext: PlanContext): IO[Boolean] = {
    readDBBoolean(s"SELECT EXISTS(SELECT 1 FROM ${schemaName}.${tableName} WHERE userid = ? AND entryid = ?)",
      List(
        SqlParameter("Int", userId.toString),
        SqlParameter("Int", entryId.toString)
      )
    )
  }
}
