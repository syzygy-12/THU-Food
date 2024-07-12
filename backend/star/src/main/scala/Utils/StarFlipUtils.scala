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
import APIs.EntryAPI.EntryStarsIncrementMessage
import Models.*

object StarFlipUtils {
  def flipStar(userId: Int, objectId: Int, starType: Int)(using planContext: PlanContext): IO[Boolean] = {
    if (!starTypes.contains(starType))
      IO.raiseError(new Exception("Invalid starType"))

    testStar(userId, objectId, starType).flatMap { exists =>
      if (exists) {
        for {
          _ <- deleteStar(userId, objectId, starType)
          _ <- if (starType == LikeForComment)
            startTransaction { CommentLikesIncrementMessage(objectId, -1).send }
          else if (starType == StarForEntry)
            startTransaction { EntryStarsIncrementMessage(objectId, -1).send }
          else IO.unit
        } yield (false)
      } else {
        for {
          _ <- createStar(userId, objectId, starType)
          _ <- if (starType == LikeForComment)
            startTransaction { CommentLikesIncrementMessage(objectId, 1).send }
          else if (starType == StarForEntry)
            startTransaction { EntryStarsIncrementMessage(objectId, 1).send }
          else IO.unit
        } yield (true)
      }

    }
  }
}
