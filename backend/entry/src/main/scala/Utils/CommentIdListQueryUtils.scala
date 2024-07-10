package Utils

import Common.API.PlanContext
import Common.DBAPI.{ReadDBRowsMessage, readDBRows}
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import cats.effect.IO
import io.circe.generic.auto.*
import io.circe.parser.*
import io.circe.Json
import io.circe.Decoder
import io.circe.HCursor

object CommentIdListQueryUtils {

  def commentIdListQuery(id: Int)(using planContext: PlanContext): IO[Array[Int]] = {

    val query = s"""SELECT "commentIdList"
                   |FROM "${schemaName}"."${tableName}"
                   |WHERE id = ?
                   """.stripMargin

    val parameters = List(SqlParameter("Int", id.toString))

    readDBRows(query, parameters).flatMap {
      case head :: _ =>
        // Extract the commentIdList field as a JSON array
        val cursor: HCursor = head.hcursor
        cursor.get[Option[Array[Int]]]("commentIdList") match {
          case Right(Some(commentIdList)) => IO.pure(commentIdList)
          case Right(None) => IO.pure(Array.empty[Int]) // handle empty arrays
          case Left(error) => IO.raiseError(new Exception("Cannot fetch commentIdList field"))
        }
      case _ =>
        IO.raiseError(new Exception(s"Entry with id $id not found"))
    }
  }
}
