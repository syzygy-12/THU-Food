package Impl

import Common.API.{PlanContext, Planner}
import Utils.CommentQueryByIdListUtils.queryCommentByIdList
import cats.effect.IO
import io.circe.generic.auto.*
import io.circe.syntax.*

case class CommentQueryByIdListMessagePlanner(idList: List[Int], override val planContext: PlanContext) extends Planner[String] {
  override def plan(using PlanContext): IO[String] = {
    queryCommentByIdList(idList).map(_.asJson.noSpaces)
  }
}
