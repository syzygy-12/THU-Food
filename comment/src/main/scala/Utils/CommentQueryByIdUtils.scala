package Utils

import Common.API.PlanContext
import Common.DBAPI.{ReadDBRowsMessage, readDBRows}
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import Models.Comment
import cats.effect.IO
import io.circe.generic.auto.*

object CommentQueryByIdUtils {
  def queryCommentById(id: Int)(using planContext: PlanContext): IO[Comment] = {
    val query = s"SELECT id, userid, objectid, content, likes, created_at FROM ${schemaName}.${tableName} WHERE id = ?"
    val parameters = List(
      SqlParameter("Int", id.toString)
    )

    readDBRows(query, parameters).flatMap {
      case head :: _ =>
        val id = head.hcursor.get[Int]("id").getOrElse(throw new Exception("Cannot fetch id"))
        val userId = head.hcursor.get[Int]("userid").getOrElse(throw new Exception("Cannot fetch userid"))
        val objectId = head.hcursor.get[Int]("objectid").getOrElse(throw new Exception("Cannot fetch objectid"))
        val content = head.hcursor.get[String]("content").getOrElse(throw new Exception("Cannot fetch content"))
        val likes = head.hcursor.get[Int]("likes").getOrElse(throw new Exception("Cannot fetch likes"))
        val createdAtStr = head.hcursor.get[String]("createdAt").getOrElse(throw new Exception("Cannot fetch createdAt"))
        IO(Comment(id, content, userId, objectId, likes, createdAtStr))
      case _ => IO.raiseError(new Exception("Cannot fetch comment"))
    }
  }
}
