package Impl

import Common.API.{PlanContext, Planner}
import Utils.CommentCreateUtils.commentCreate
import cats.effect.IO
import io.circe.generic.auto.*

case class CommentCreateMessagePlanner(content: String, userId: Int, objectId: Int, commentType: Int, override val planContext: PlanContext) extends Planner[Int] {
  override def plan(using PlanContext): IO[Int] = {
    commentCreate(content, userId, objectId, commentType)
  }
}
