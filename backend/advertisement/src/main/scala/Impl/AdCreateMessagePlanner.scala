package Impl

import Common.API.{PlanContext, Planner}
import Utils.AdCreateUtils.adCreate
import cats.effect.IO
import io.circe.generic.auto.*

case class AdCreateMessagePlanner(override val planContext: PlanContext) extends Planner[Int] {
  override def plan(using PlanContext): IO[Int] = {
    adCreate()
  }
}
