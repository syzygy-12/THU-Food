package Impl

import Common.API.{PlanContext, Planner}
import Utils.LikesModifyUtils.likesModify
import Utils.LikesQueryUtils.queryLikes
import cats.effect.IO
import io.circe.generic.auto.*

case class CommentLikesIncrementMessagePlanner(id: Int, delta: Int, override val planContext: PlanContext) extends Planner[Boolean] {
  override def plan(using PlanContext): IO[Boolean] = {
    for {
      likes <- queryLikes(id)
      result <- likesModify(id, likes + delta)
    } yield result
  }
}
