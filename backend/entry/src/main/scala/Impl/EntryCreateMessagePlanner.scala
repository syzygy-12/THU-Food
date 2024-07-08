package Impl

import Common.API.{PlanContext, Planner}
import cats.effect.IO
import io.circe.generic.auto._
import Utils.EntryCreateUtils.entryCreate

case class EntryCreateMessagePlanner(override val planContext: PlanContext) extends Planner[Int] {
  override def plan(using PlanContext): IO[Int] = {
    entryCreate()
  }
}
