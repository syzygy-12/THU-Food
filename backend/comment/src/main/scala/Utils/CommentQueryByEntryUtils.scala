package Utils

import Common.API.PlanContext
import Common.DBAPI.{ReadDBRowsMessage, readDBBoolean, readDBRows}
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import Models.Comment
import cats.effect.IO
import io.circe.Json
import io.circe.generic.auto.*

object CommentQueryByEntryUtils {
  def queryCommentByEntry(entryId: Int)(using planContext: PlanContext): IO[List[Comment]] = {
    val query = s"SELECT id, userid, entryid, content FROM ${schemaName}.${tableName} WHERE entryid = ?"
    val parameters = List(SqlParameter("Int", entryId.toString))

    readDBRows(query, parameters).map { rows =>
      rows.map { row =>
        val id = row.hcursor.get[Int]("id").getOrElse(throw new Exception("Cannot fetch id"))
        val userId = row.hcursor.get[Int]("userid").getOrElse(throw new Exception("Cannot fetch userid"))
        val entryId = row.hcursor.get[Int]("entryid").getOrElse(throw new Exception("Cannot fetch entryid"))
        val content = row.hcursor.get[String]("content").getOrElse(throw new Exception("Cannot fetch content"))
        Comment(id, content, userId, entryId)
      }
    }
  }
}
