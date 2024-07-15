package Impl

import Common.API.{PlanContext, Planner}
import Utils.AdModifyUtils.adModify
import cats.effect.IO
import io.circe.generic.auto.*

case class AdModifyMessagePlanner(id: Int, entryId: Int, image: String, override val planContext: PlanContext) extends Planner[Unit] {
  override def plan(using PlanContext): IO[Unit] = {
    adModify(id, entryId, image)
  }
}
