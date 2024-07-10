package Impl

import Common.API.{PlanContext, Planner}
import Utils.CommentQueryUtils.commentQuery
import cats.effect.IO
import io.circe.syntax.*
import io.circe.generic.auto.*

case class CommentQueryMessagePlanner(id: Int, override val planContext: PlanContext) extends Planner[String] {
  override def plan(using PlanContext): IO[String] = {
    commentQuery(id).map(_.asJson.noSpaces)
  }
}
