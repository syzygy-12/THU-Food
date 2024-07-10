package Impl

import Common.API.{PlanContext, Planner}
import Utils.StarCreateUtils.createStar
import cats.effect.IO
import io.circe.generic.auto.*

case class StarCreateMessagePlanner(userId: Int, entryId: Int, override val planContext: PlanContext) extends Planner[Boolean] {
  override def plan(using PlanContext): IO[Boolean] = {
    createStar(userId, entryId)
  }
}
