package Impl

import Common.API.{PlanContext, Planner}
import Utils.IsHiddenModifyUtils.isHiddenModify
import cats.effect.IO
import io.circe.generic.auto.*

case class IsHiddenModifyMessagePlanner(id: Int, isHidden: Boolean, override val planContext: PlanContext) extends Planner[Boolean] {
  override def plan(using PlanContext): IO[Boolean] = {
    isHiddenModify(id, isHidden)
  }
}
