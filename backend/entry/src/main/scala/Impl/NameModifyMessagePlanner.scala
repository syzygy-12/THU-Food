package Impl

import Common.API.{PlanContext, Planner}
import Utils.NameModifyUtils.nameModify
import cats.effect.IO
import io.circe.generic.auto.*

case class NameModifyMessagePlanner(id: Int, newName: String, override val planContext: PlanContext) extends Planner[Boolean] {
  override def plan(using PlanContext): IO[Boolean] = {
    nameModify(id, newName)
  }
}
