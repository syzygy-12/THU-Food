package Impl

import Common.API.{PlanContext, Planner}
import Utils.IsFoodModifyUtils.isFoodModify
import cats.effect.IO
import io.circe.generic.auto.*

case class IsFoodModifyMessagePlanner(id: Int, isFood: Boolean, override val planContext: PlanContext) extends Planner[Boolean] {
  override def plan(using PlanContext): IO[Boolean] = {
    isFoodModify(id, isFood)
  }
}
