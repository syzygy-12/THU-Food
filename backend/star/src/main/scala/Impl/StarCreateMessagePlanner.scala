package Impl

import Common.API.{PlanContext, Planner}
import Utils.StarCreateUtils.createStar
import cats.effect.IO
import io.circe.generic.auto.*

case class StarCreateMessagePlanner(userId: Int, objectId: Int, starType: Int, override val planContext: PlanContext) extends Planner[Unit] {
  override def plan(using PlanContext): IO[Unit] = {
    createStar(userId, objectId, starType)
  }
}
