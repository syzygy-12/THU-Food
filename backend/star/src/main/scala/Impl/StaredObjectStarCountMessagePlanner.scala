package Impl

import Common.API.{PlanContext, Planner}
import Utils.StaredObjectStarCountUtils.queryStarNumber
import cats.effect.IO
import io.circe.Encoder
import io.circe.generic.auto.*
import io.circe.syntax.*

case class StaredObjectStarCountMessagePlanner(objectId: Int, starType: Int, override val planContext: PlanContext) extends Planner[Int] {
  override def plan(using planContext: PlanContext): IO[Int] = {
    queryStarNumber(objectId, starType)
  }
}
