package Utils

import Common.API.PlanContext
import Common.DBAPI.*
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import Utils.StarTestUtils.testStar
import cats.effect.IO
import io.circe.generic.auto.*
import Utils.StarDeleteUtils.deleteStar
import Utils.StarCreateUtils.createStar
import APIs.CommentAPI.CommentLikesIncrementMessage
import Models.*

object StarFlipUtils {
  def flipStar(userId: Int, entryId: Int, starType: Int)(using planContext: PlanContext): IO[Unit] = {
    if (!starTypes.contains(starType)) {
      IO.raiseError(new Exception("Invalid starType"))
    } else {
      testStar(userId, entryId, starType).flatMap { exists =>
        if (exists) {
          for {
            _ <- deleteStar(userId, entryId, starType) // 删除记录
            _ <- if (starType == LikeForComment) {
              startTransaction {
                CommentLikesIncrementMessage(entryId, -1).send // 发送消息
              }
            } else IO.unit
          } yield ()


        } else {
          for {
            _ <- createStar(userId, entryId, starType)
            _ <- if (starType == LikeForComment) {
              startTransaction {
                CommentLikesIncrementMessage(entryId, 1).send // 发送消息
              }
            } else IO.unit
          } yield ()
        }
      }
    }
  }
}
