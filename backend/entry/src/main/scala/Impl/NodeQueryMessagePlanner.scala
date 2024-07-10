package Impl

import Common.API.{PlanContext, Planner}
import cats.effect.IO
import io.circe.syntax._
import io.circe.generic.auto._
import io.circe.Encoder
import Models.Node
import Utils.NodeIdQueryUtils.nodeIdQuery

case class NodeQueryMessagePlanner(id: Int, override val planContext: PlanContext) extends Planner[String] {
  override def plan(using planContext: PlanContext): IO[String] = {
    nodeIdQuery(id).map(_.asJson.noSpaces)
  }
}
