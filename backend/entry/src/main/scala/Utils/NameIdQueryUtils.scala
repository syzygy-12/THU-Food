package Utils

import Common.API.PlanContext
import Common.DBAPI.{ReadDBRowsMessage, readDBRows}
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import Utils.JsonUtils.extractJsonField
import cats.effect.IO
import io.circe.generic.auto.*

object NameIdQueryUtils {

  def nameIdQuery(id: Int)(using planContext: PlanContext): IO[String] = {

    val query = readDBRows(
      s"""SELECT name
         |FROM "${schemaName}"."${tableName}"
         |WHERE id = ?
         """.stripMargin,
      List(SqlParameter("Int", id.toString))
    )

    extractJsonField("name", query)
  }
}