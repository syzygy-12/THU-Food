package Impl

import Common.API.{PlanContext, Planner}
import Utils.EntryTestUtils.entryTest
import cats.effect.IO
import io.circe.generic.auto.*

case class EntryTestMessagePlanner(id: Int, override val planContext: PlanContext) extends Planner[Boolean] {
  override def plan(using PlanContext): IO[Boolean] = {
    entryTest(id)
  }
}
