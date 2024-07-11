package Impl

import Common.API.{PlanContext, Planner}
import Utils.StarFlipUtils.flipStar
import cats.effect.IO
import io.circe.generic.auto.*

case class StarFlipMessagePlanner(userId: Int, objectId: Int, starType: Int, override val planContext: PlanContext) extends Planner[Unit] {
  override def plan(using PlanContext): IO[Unit] = {
    flipStar(userId, objectId, starType)
  }
}
