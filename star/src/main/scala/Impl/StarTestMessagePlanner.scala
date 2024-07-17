package Impl

import Common.API.{PlanContext, Planner}
import Utils.StarTestUtils.testStar
import cats.effect.IO
import io.circe.generic.auto.*

case class StarTestMessagePlanner(userId: Int, objectId: Int, starType: Int, override val planContext: PlanContext) extends Planner[Boolean] {
  override def plan(using PlanContext): IO[Boolean] = {
    testStar(userId, objectId, starType)
  }
}
