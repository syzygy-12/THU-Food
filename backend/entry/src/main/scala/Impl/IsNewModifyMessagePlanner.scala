package Impl

import Common.API.{PlanContext, Planner}
import Utils.IsNewModifyUtils.isNewModify
import cats.effect.IO
import io.circe.generic.auto.*

case class IsNewModifyMessagePlanner(id: Int, isNew: Boolean, override val planContext: PlanContext) extends Planner[Boolean] {
  override def plan(using PlanContext): IO[Boolean] = {
    isNewModify(id, isNew)
  }
}
