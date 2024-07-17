package Impl

import APIs.UserAPI.TokenUserIdQueryMessage
import Common.API.{PlanContext, Planner}
import Common.DBAPI.startTransaction
import Utils.StarCreateUtils.createStar
import cats.effect.IO
import io.circe.generic.auto.*

case class StarCreateMessagePlanner(userId: Int, objectId: Int, starType: Int, token: String, override val planContext: PlanContext) extends Planner[Unit] {
  override def plan(using PlanContext): IO[Unit] = {
    startTransaction {
      val userIdIO = TokenUserIdQueryMessage(token).send

      userIdIO.flatMap { queriedUserId =>
        if (queriedUserId == userId) {
          createStar(userId, objectId, starType)
        } else {
          IO.raiseError(new Exception("Token 与用户不匹配"))
        }
      }
    }
  }
}
