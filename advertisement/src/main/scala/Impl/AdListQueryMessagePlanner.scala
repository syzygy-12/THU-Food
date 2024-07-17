package Impl

import Common.API.{PlanContext, Planner}
import Models.Advertisement
import Utils.AdListQueryUtils.adListQuery
import cats.effect.IO
import io.circe.generic.auto.*

case class AdListQueryMessagePlanner(override val planContext: PlanContext) extends Planner[List[Advertisement]] {
  override def plan(using PlanContext): IO[List[Advertisement]] = {
    adListQuery()
  }
}
