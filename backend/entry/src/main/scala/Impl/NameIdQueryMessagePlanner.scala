package Impl

import Common.API.{PlanContext, Planner}
import Models.Node
import Utils.NameIdQueryUtils.nameIdQuery
import cats.effect.IO
import io.circe.Encoder
import io.circe.generic.auto.*
import io.circe.syntax.*

case class NameIdQueryMessagePlanner(id: Int, override val planContext: PlanContext) extends Planner[String] {
  override def plan(using planContext: PlanContext): IO[String] = {
    nameIdQuery(id)
  }
}
