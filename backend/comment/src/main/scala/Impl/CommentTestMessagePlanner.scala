package Impl

import Common.API.{PlanContext, Planner}
import Utils.CommentTestUtils.commentTest
import cats.effect.IO
import io.circe.generic.auto.*

case class CommentTestMessagePlanner(id: Int, override val planContext: PlanContext) extends Planner[Boolean] {
  override def plan(using PlanContext): IO[Boolean] = {
    commentTest(id)
  }
}
