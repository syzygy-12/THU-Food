package Utils

import Common.API.PlanContext
import Common.DBAPI.{ReadDBRowsMessage, readDBBoolean, readDBRows}
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import Models.Comment
import cats.effect.IO
import io.circe.generic.auto.*

object CommentQueryByObjectUtils {
  def queryCommentByObject(objectId: Int, commentType: Int)(using planContext: PlanContext): IO[List[Comment]] = {
    val query = s"SELECT id, userid, objectid, content, created_at FROM ${schemaName}.${tableName} WHERE objectid = ? AND comment_type = ?"
    val parameters = List(
      SqlParameter("Int", objectId.toString),
      SqlParameter("Int", commentType.toString)
    )

    readDBRows(query, parameters).map { rows =>
      rows.map { row =>
        val id = row.hcursor.get[Int]("id").getOrElse(throw new Exception("Cannot fetch id"))
        val userId = row.hcursor.get[Int]("userid").getOrElse(throw new Exception("Cannot fetch userid"))
        val objectId = row.hcursor.get[Int]("objectid").getOrElse(throw new Exception("Cannot fetch objectid"))
        val content = row.hcursor.get[String]("content").getOrElse(throw new Exception("Cannot fetch content"))
        val createdAtStr = row.hcursor.get[String]("createdAt").getOrElse(throw new Exception("Cannot fetch createdAt"))
        Comment(id, content, userId, objectId, createdAtStr)
      }
    }
  }
}