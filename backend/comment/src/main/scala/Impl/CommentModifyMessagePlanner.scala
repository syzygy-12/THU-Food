package Impl

import APIs.UserAPI.TokenUserIdQueryMessage
import Common.API.{PlanContext, Planner}
import Common.DBAPI.startTransaction
import Utils.CommentModifyUtils.commentModify
import Utils.CommentQueryByIdUtils.queryCommentById
import cats.effect.IO
import io.circe.generic.auto._

case class CommentModifyMessagePlanner(id: Int, content: String, token: String, override val planContext: PlanContext) extends Planner[Unit] {
  override def plan(using PlanContext): IO[Unit] = {
    val commentIO = queryCommentById(id)

    commentIO.flatMap { comment =>
      startTransaction {
        val userIdIO = TokenUserIdQueryMessage(token).send

        userIdIO.flatMap { queriedUserId =>
          if (queriedUserId == comment.userId) {
            commentModify(id, content)
          } else {
            IO.raiseError(new Exception("Token 与用户不匹配"))
          }
        }
      }
    }
  }
}
