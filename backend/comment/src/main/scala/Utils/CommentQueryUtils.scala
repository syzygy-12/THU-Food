package Utils

import Common.API.PlanContext
import Common.DBAPI.{ReadDBRowsMessage, readDBRows}
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import Models.Comment
import cats.effect.IO
import io.circe.generic.auto.*

object CommentQueryUtils {
  def queryComment(userId: Int, objectId: Int, commentType: Int)(using planContext: PlanContext): IO[Comment] = {
    val query = s"SELECT id, userid, objectid, content, created_at FROM ${schemaName}.${tableName} WHERE userid = ? AND objectid = ? AND comment_type = ?"
    val parameters = List(
      SqlParameter("Int", userId.toString),
      SqlParameter("Int", objectId.toString),
      SqlParameter("Int", commentType.toString)
    )

    readDBRows(query, parameters).flatMap {
      case head :: _ =>
        val id = head.hcursor.get[Int]("id").getOrElse(throw new Exception("Cannot fetch id"))
        val userId = head.hcursor.get[Int]("userid").getOrElse(throw new Exception("Cannot fetch userid"))
        val objectId = head.hcursor.get[Int]("objectid").getOrElse(throw new Exception("Cannot fetch objectid"))
        val content = head.hcursor.get[String]("content").getOrElse(throw new Exception("Cannot fetch content"))
        val createdAtStr = head.hcursor.get[String]("createdAt").getOrElse(throw new Exception("Cannot fetch createdAt"))
        IO(Comment(id, content, userId, objectId, createdAtStr))
      case _ => IO.raiseError(new Exception("Cannot fetch comment"))
    }
  }
}
