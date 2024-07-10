package Utils

import Common.API.PlanContext
import Common.DBAPI.{ReadDBRowsMessage, readDBBoolean, readDBRows}
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import Models.Comment
import Utils.JsonUtils.extractJsonField
import Utils.CommentUtils.stringToComment
import cats.effect.IO
import io.circe.Json
import io.circe.generic.auto.*

object CommentQueryUtils {

  def commentQuery(id: Int)(using planContext: PlanContext): IO[Comment] = {
    val query = readDBRows(
      s"""SELECT comment
         |FROM "${schemaName}"."${tableName}"
         |WHERE id = ?
         """.stripMargin,
      List(SqlParameter("Int", id.toString))
    )

    extractJsonField("comment", query).flatMap { str => stringToComment(str) }
  }
}
