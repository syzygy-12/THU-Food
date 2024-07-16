package Impl

import APIs.UserAPI.TokenAuthorityQueryMessage
import Common.API.{PlanContext, Planner}
import Common.DBAPI.startTransaction
import Utils.CommentDeleteUtils.commentDelete
import cats.effect.IO
import io.circe.generic.auto.*
import Models.*

case class CommentDeleteMessagePlanner(id: Int, token: String, override val planContext: PlanContext) extends Planner[Unit] {
  override def plan(using PlanContext): IO[Unit] = {
    startTransaction {
      val authorityIO = TokenAuthorityQueryMessage(token).send

      authorityIO.flatMap { authority =>
        if (authority == ForumManagerType || authority == SuperManagerType) {
          commentDelete(id)
        } else {
          IO.raiseError(new Exception("用户权限不足"))
        }
      }
    }
  }
}
