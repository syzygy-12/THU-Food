package Utils

import Common.API.PlanContext
import Common.DBAPI.{ReadDBRowsMessage, readDBBoolean, readDBRows}
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import Models.EntryInit
import Utils.NodeUtils.nodeToString
import cats.effect.IO
import io.circe.Json
import io.circe.generic.auto.*

object EntryTestUtils {

  def entryTest(id: Int)(using planContext: PlanContext): IO[Boolean] = {
    readDBBoolean(s"SELECT EXISTS(SELECT 1 FROM ${schemaName}.${tableName} WHERE id = ?)",
      List(SqlParameter("Int", Integer.toString(id)))
    )
  }
}
