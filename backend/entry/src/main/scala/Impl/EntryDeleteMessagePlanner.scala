package Impl

import Common.API.{PlanContext, Planner}
import Utils.EntryDeleteUtils.entryDelete
import cats.effect.IO
import io.circe.generic.auto.*

case class EntryDeleteMessagePlanner(id: Int, override val planContext: PlanContext) extends Planner[Unit] {
  override def plan(using PlanContext): IO[Unit] = {
    entryDelete(id)
  }
}
