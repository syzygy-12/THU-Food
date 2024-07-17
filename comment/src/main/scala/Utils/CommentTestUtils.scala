package Utils

import Common.API.PlanContext
import Common.DBAPI.{readDBBoolean, writeDB}
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import cats.effect.IO
import io.circe.generic.auto.*

object CommentTestUtils {

  def commentTest(userId: Int, objectId: Int, commentType: Int)(using planContext: PlanContext): IO[Boolean] = {
    readDBBoolean(s"SELECT EXISTS(SELECT 1 FROM ${schemaName}.${tableName} WHERE userid = ? AND objectid = ? AND comment_type = ?)",
      List(
        SqlParameter("Int", userId.toString),
        SqlParameter("Int", objectId.toString),
        SqlParameter("Int", commentType.toString),
      )
    )
  }
}
