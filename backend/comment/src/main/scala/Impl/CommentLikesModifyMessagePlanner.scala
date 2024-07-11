package Impl

import Common.API.{PlanContext, Planner}
import Utils.LikesModifyUtils.likesModify
import cats.effect.IO
import io.circe.generic.auto.*

case class CommentLikesModifyMessagePlanner(id: Int, likes: Int, override val planContext: PlanContext) extends Planner[Boolean] {
  override def plan(using PlanContext): IO[Boolean] = {
    likesModify(id, likes)
  }
}
