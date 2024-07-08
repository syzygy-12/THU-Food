package Utils

import Common.API.{PlanContext, Planner}
import Common.DBAPI.{readDBRows, ReadDBRowsMessage}
import Common.ServiceUtils.schemaName
import Common.Object.SqlParameter
import cats.effect.IO
import io.circe.generic.auto._
import io.circe.Json
import Models.Node
import io.circe.parser._
import Utils.NodeUtils.jsonToNode

object NodeIdQueryUtils {

  def nodeIdQuery(id: Int)(using planContext: PlanContext): IO[Node] = {
    // 查询数据库中的记录，并将结果转换为 JSON
    val query = readDBRows(
      s"""SELECT row_to_json(t) FROM (
               SELECT *
               FROM "${schemaName}".node_info
               WHERE id = ?
             ) t""",
      List(SqlParameter("Int", id.toString))
    )

    query.flatMap {
      case head :: _ =>
        val jsonResultStrOpt = head.hcursor.downField("rowToJson").as[String].toOption
        jsonResultStrOpt match {
          case Some(jsonStr) =>
            parse(jsonStr) match {
              case Right(json) => jsonToNode(json)
              case Left(error) => IO.raiseError(new Exception(s"Failed to parse JSON string: ${error.getMessage}"))
            }
          case None => IO.raiseError(new Exception("Invalid JSON format"))
        }
      case _ =>
        IO.raiseError(new Exception("Record not found"))
    }
  }
}