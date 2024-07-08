package Impl

import Common.API.{PlanContext, Planner}
import cats.effect.IO
import io.circe.generic.auto._
import Utils.NodeUtils.stringToNode
import Utils.NodeCreateUtils.nodeCreate

case class EntryCreateMessagePlanner(info: String, override val planContext: PlanContext) extends Planner[Int] {
  override def plan(using PlanContext): IO[Int] = {
    val node = stringToNode(info)
    node.flatMap(nodeCreate)
  }
}
