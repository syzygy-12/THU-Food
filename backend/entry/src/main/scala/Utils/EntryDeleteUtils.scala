package Utils

import Common.API.PlanContext
import Common.DBAPI.{ReadDBRowsMessage, readDBRows, writeDB}
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import cats.effect.IO
import io.circe.Json
import io.circe.generic.auto.*
import io.circe.syntax.*

object EntryDeleteUtils {
  def entryDelete(id: Int)(using planContext: PlanContext): IO[Unit] = {
    if (id == 1)
      IO.unit
    else {
      writeDB(
        s"DELETE FROM ${schemaName}.${tableName} WHERE id = ?",
        List(SqlParameter("Int", id.toString))
      ).map(_ => IO.unit)
    }
  }
}
