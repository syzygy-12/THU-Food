package Impl

import Common.API.{PlanContext, Planner}
import Utils.NodeUtils.stringToNode
import Utils.NodeModifyUtils.nodeModify
import cats.effect.IO
import io.circe.generic.auto.*

case class NodeModifyMessagePlanner(id: Int, info: String, override val planContext: PlanContext) extends Planner[String]:
  override def plan(using PlanContext): IO[String] = {
    val node = stringToNode(info)
    node.flatMap(node => nodeModify(id, node))
  }

