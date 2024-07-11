package Impl

import Common.API.{PlanContext, Planner}
import Utils.StarDeleteUtils.deleteStar
import Utils.StarTestUtils.testStar
import cats.effect.IO
import io.circe.generic.auto.*

case class StarDeleteMessagePlanner(userId: Int, objectId: Int, starType: Int, override val planContext: PlanContext) extends Planner[Unit] {
  override def plan(using PlanContext): IO[Unit] = {
    deleteStar(userId, objectId, starType)
  }
}
