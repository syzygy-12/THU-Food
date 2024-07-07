package Impl

import Common.API.{PlanContext, Planner}
import Common.DBAPI.{readDBBoolean, readDBRows, readDBString}
import Common.Object.SqlParameter
import Common.ServiceUtils.schemaName
import cats.effect.IO
import io.circe.generic.auto.*

case class NodeIdQueryMessagePlanner(id: Int, override val planContext: PlanContext) extends Planner[String] {
  override def plan(using PlanContext): IO[String] = {
    val sqlQuery = s"SELECT info FROM ${schemaName}.node_info WHERE id = ${id}"
    readDBString(sqlQuery, List.empty)
  }
}