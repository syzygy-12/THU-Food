package Utils

import Common.API.PlanContext
import Common.DBAPI.{readDBRows, writeDB}
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import Utils.CommentIdListQueryUtils.commentIdListQuery
import Utils.CommentIdListModifyUtils.commentIdListModify
import cats.effect.IO
import io.circe.Json
import io.circe.generic.auto.*
import io.circe.syntax.*

object CommentIdInsertUtils {

  def commentIdInsert(id: Int, newCommentId: Int)(using planContext: PlanContext): IO[Int] = {
    for {
      // Step 1: Retrieve the current commentIdList for the given entry
      currentCommentIdList <- commentIdListQuery(id)

      // Step 2: Append the new commentId to the current commentIdList
      updatedCommentIdList = currentCommentIdList :+ newCommentId

      // Step 3: Update the entry with the new commentIdList
      _ <- commentIdListModify(id, updatedCommentIdList)
    } yield id
  }
}
