package Utils

import Common.API.PlanContext
import Common.DBAPI.{ReadDBRowsMessage, readDBRows}
import Common.ServiceUtils.*
import Common.Object.SqlParameter
import cats.effect.IO
import io.circe.generic.auto.*
import Models.Node
import Utils.JsonUtils.extractJsonField
import Utils.NodeUtils.stringToNode

object NodeIdQueryUtils {

  def nodeIdQuery(id: Int)(using planContext: PlanContext): IO[Node] = {

    val query = readDBRows(
      s"""SELECT node
         |FROM "${schemaName}"."${tableName}"
         |WHERE id = ?
         """.stripMargin,
      List(SqlParameter("Int", id.toString))
    )

    extractJsonField("node", query).flatMap { str => stringToNode(str) }
  }
}