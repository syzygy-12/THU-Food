package Impl

import APIs.UserAPI.TokenUserIdQueryMessage
import Common.API.{PlanContext, Planner}
import Common.DBAPI.startTransaction
import Utils.StarDeleteUtils.deleteStar
import Utils.StarTestUtils.testStar
import cats.effect.IO
import io.circe.generic.auto.*

case class StarDeleteMessagePlanner(userId: Int, objectId: Int, token: String, starType: Int, override val planContext: PlanContext) extends Planner[Unit] {
  override def plan(using PlanContext): IO[Unit] = {
    startTransaction {
      val userIdIO = TokenUserIdQueryMessage(token).send

      userIdIO.flatMap { queriedUserId =>
        if (queriedUserId == userId) {
          deleteStar(userId, objectId, starType)
        } else {
          IO.raiseError(new Exception("Token 与用户不匹配"))
        }
      }
    }
  }
}
