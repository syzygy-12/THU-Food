package Utils

import Common.API.PlanContext
import Common.DBAPI.{ReadDBRowsMessage, readDBBoolean, readDBRows}
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import cats.effect.IO
import io.circe.Json
import io.circe.generic.auto.*

object CommentTestUtils {

  def commentTest(id: Int)(using planContext: PlanContext): IO[Boolean] = {
    readDBBoolean(s"SELECT EXISTS(SELECT 1 FROM ${schemaName}.${tableName} WHERE id = ?)",
      List(SqlParameter("Int", Integer.toString(id)))
    )
  }
}
