package Impl

import APIs.UserAPI.TokenUserIdQueryMessage
import Common.API.{PlanContext, Planner}
import Common.DBAPI.startTransaction
import Utils.CommentCreateUtils.commentCreate
import cats.effect.IO
import io.circe.generic.auto.*

case class CommentCreateMessagePlanner(content: String, userId: Int, objectId: Int, commentType: Int, token: String, override val planContext: PlanContext) extends Planner[Int] {
  override def plan(using PlanContext): IO[Int] = {
    startTransaction {
      val userIdIO = TokenUserIdQueryMessage(token).send

      userIdIO.flatMap { queriedUserId =>
        if (queriedUserId == userId) {
          commentCreate(content, userId, objectId, commentType)
        } else {
          IO.raiseError(new Exception("Token 与用户不匹配"))
        }
      }
    }
  }
}
