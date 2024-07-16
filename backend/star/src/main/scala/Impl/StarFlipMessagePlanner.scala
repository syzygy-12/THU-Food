package Impl

import APIs.UserAPI.TokenUserIdQueryMessage
import Common.API.{PlanContext, Planner}
import Common.DBAPI.startTransaction
import Utils.StarFlipUtils.flipStar
import cats.effect.IO
import io.circe.generic.auto.*

case class StarFlipMessagePlanner(userId: Int, objectId: Int, starType: Int, token: String, override val planContext: PlanContext) extends Planner[Boolean] {
  override def plan(using PlanContext): IO[Boolean] = {
    startTransaction {
      val userIdIO = TokenUserIdQueryMessage(token).send

      userIdIO.flatMap { queriedUserId =>
        if (queriedUserId == userId) {
          flipStar(userId, objectId, starType)
        } else {
          IO.raiseError(new Exception("Token 与用户不匹配"))
        }
      }
    }
  }
}
