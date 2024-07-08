package Impl

import Common.API.{PlanContext, Planner}
import Common.DBAPI.{readDBRows, ReadDBRowsMessage}
import Common.ServiceUtils.schemaName
import Common.Object.SqlParameter
import cats.effect.IO
import io.circe.syntax._
import io.circe.generic.auto._
import io.circe.{Encoder, Json}
import Models.Node
import Utils.NodeIdQueryUtils.nodeIdQuery

case class NodeIdQueryMessagePlanner(id: Int, override val planContext: PlanContext) extends Planner[String] {

  override def plan(using planContext: PlanContext): IO[String] = {
    nodeIdQuery(id).map(_.asJson.noSpaces)
  }
}
