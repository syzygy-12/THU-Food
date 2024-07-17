package Utils

import APIs.EntryAPI.ScoreHistogramIncrementMessage
import Common.API.PlanContext
import Common.DBAPI.*
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import Models.*
import Utils.CommentCreateUtils.commentCreate
import Utils.CommentDeleteUtils.commentDelete
import Utils.CommentTestUtils.commentTest
import cats.effect.IO
import io.circe.generic.auto.*
import Models.*
import Utils.CommentQueryUtils.queryComment

object ScoreHistogramFlipUtils {
  def flipScoreHistogram(score: Int, userId: Int, objectId: Int)(using planContext: PlanContext): IO[Unit] = {
    val commentType = ScoreForEntry
    val content = score.toString
    commentTest(userId, objectId, commentType).flatMap { exists =>
      if (exists) {
        for {
          id <- queryComment(userId, objectId, commentType).map(_.id) // 获取记录id
          _ <- commentDelete(id) // 删除记录
          _ <- 
            startTransaction {
              ScoreHistogramIncrementMessage(objectId, score, -1).send // 发送消息
            }
        } yield ()


      } else {
        for {
          _ <- commentCreate(content, userId, objectId, commentType) // 删除记录
          _ <-
            startTransaction {
              ScoreHistogramIncrementMessage(objectId, score, 1).send // 发送消息
            }
        } yield ()
      }
    }
  }
}
