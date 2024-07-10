package Utils

import Common.API.PlanContext
import Common.DBAPI.{ReadDBRowsMessage, readDBRows}
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import Utils.CommentTestUtils.commentTest
import cats.effect.IO
import io.circe.Json
import io.circe.generic.auto.*


lazy val Multiple: Map[Int, Boolean] = Map(
  0 -> false,  // ScoreForEntry
  1 -> false, // CommentForEntry
  2 -> true,  // CommentForBlog
  3 -> false  // Blog
)

object CommentCreateUtils {

  def commentCreate(content: String, userId: Int, objectId: Int, commentType: Int)(using planContext: PlanContext): IO[Int] = {

    val mutipleIO = Multiple.get(commentType) match {
      case Some(value) => IO.pure(value)
      case None => IO.raiseError(new Exception("Invalid commentType"))
    }

    mutipleIO.flatMap { mutiple =>
      if (!mutiple) {
        commentTest(userId, objectId, commentType).flatMap { exists =>
          if (exists) {
            IO.raiseError(new Exception("comment already exists"))
          } else {
            insertComment(content, userId, objectId, commentType)
          }
        }
      } else {
        insertComment(content, userId, objectId, commentType)
      }
    }
  }

  private def insertComment(content: String, userId: Int, objectId: Int, commentType: Int)(using planContext: PlanContext): IO[Int] = {
    val query = s"INSERT INTO ${schemaName}.${tableName} (userid, objectid, content, comment_type) VALUES (?,?,?,?) RETURNING id"
    val parameters = List(
      SqlParameter("Int", userId.toString),
      SqlParameter("Int", objectId.toString),
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
