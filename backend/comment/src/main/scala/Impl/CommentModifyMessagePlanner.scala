package Impl

import Common.API.{PlanContext, Planner}
import Utils.CommentModifyUtils.commentModify
import cats.effect.IO
import io.circe.generic.auto.*

case class CommentModifyMessagePlanner(id: Int, content: String, override val planContext: PlanContext) extends Planner[Boolean] {
  override def plan(using PlanContext): IO[Boolean] = {
    commentModify(id, content)
  }
}
