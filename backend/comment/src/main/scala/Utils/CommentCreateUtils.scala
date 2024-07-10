package Utils

import Common.API.PlanContext
import Common.DBAPI.{ReadDBRowsMessage, readDBRows}
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import Models.{Comment, CommentInit}
import Utils.CommentUtils.commentToString
import cats.effect.IO
import io.circe.Json
import io.circe.generic.auto.*
import io.circe.syntax.*

object CommentCreateUtils {

  def commentCreate(content: String, userId: Int, entryId: Int)(using planContext: PlanContext): IO[Int] = {

    val comment = Comment(content, userId, entryId)
    val query = s"INSERT INTO ${schemaName}.${tableName} (comment) VALUES (?) RETURNING id"
    val parameters = List(
      SqlParameter("Json", commentToString(comment))
    )

    readDBRows(query, parameters).flatMap {
      case head :: _ =>
        IO(head.hcursor.get[Int]("id").getOrElse(throw new Exception("Cannot fetch ID")))
      case _ =>
        IO.raiseError(new Exception("Insert operation failed"))
    }
  }
}
