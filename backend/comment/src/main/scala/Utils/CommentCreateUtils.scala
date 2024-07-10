package Utils

import Common.API.PlanContext
import Common.DBAPI.{ReadDBRowsMessage, readDBRows}
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import Models.Comment
import cats.effect.IO
import io.circe.Json
import io.circe.generic.auto.*
import io.circe.syntax.*

object CommentCreateUtils {

  def commentCreate(content: String, userId: Int, entryId: Int, commentType: Int)(using planContext: PlanContext): IO[Int] = {
    
    val query = s"INSERT INTO ${schemaName}.${tableName} (userid, entryid, content, comment_type) VALUES (?,?,?,?) RETURNING id"
    val parameters = List(
      SqlParameter("Int", userId.toString),
      SqlParameter("Int", entryId.toString),
      SqlParameter("String", content),
      SqlParameter("Int", commentType.toString)
    )

    readDBRows(query, parameters).flatMap {
      case head :: _ =>
        IO(head.hcursor.get[Int]("id").getOrElse(throw new Exception("Cannot fetch ID")))
      case _ =>
        IO.raiseError(new Exception("Insert operation failed"))
    }
  }
}
