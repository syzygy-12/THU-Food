package Utils

import Common.API.PlanContext
import Common.DBAPI.*
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import cats.effect.IO

object EntryTestUtils {
  def entryTest(id: Int)(using planContext: PlanContext): IO[Boolean] = {
    readDBBoolean(s"SELECT EXISTS(SELECT 1 FROM ${schemaName}.${tableName} WHERE id = ?)",
      List(SqlParameter("Int", Integer.toString(id)))
    )
  }
}
