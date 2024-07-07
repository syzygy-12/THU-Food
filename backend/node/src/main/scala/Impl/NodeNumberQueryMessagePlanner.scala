package Impl

import Common.API.{PlanContext, Planner}
import Common.DBAPI.{readDBBoolean, readDBRows, readDBString}
import Common.Object.SqlParameter
import Common.ServiceUtils.schemaName
import cats.effect.IO
import io.circe.generic.auto.*

case class NodeNumberQueryMessagePlanner(override val planContext: PlanContext) extends Planner[String] {
  override def plan(using PlanContext): IO[String] = {
    val sqlQuery = s"SELECT COUNT(*) FROM ${schemaName}.node_info"
    readDBString(sqlQuery, List.empty).map { count =>
      s"Total number of nodes: $count"
    }
  }
}