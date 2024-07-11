package Impl

import Common.API.{PlanContext, Planner}
import Utils.CommentDeleteUtils.commentDelete
import cats.effect.IO
import io.circe.generic.auto.*

case class CommentDeleteMessagePlanner(id: Int, override val planContext: PlanContext) extends Planner[Unit] {
  override def plan(using PlanContext): IO[Unit] = {
    commentDelete(id)
  }
}
