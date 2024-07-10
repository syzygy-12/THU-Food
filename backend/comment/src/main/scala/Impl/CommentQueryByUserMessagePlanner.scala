package Impl

import Common.API.{PlanContext, Planner}
import Utils.CommentQueryByUserUtils.queryCommentByUser
import cats.effect.IO
import io.circe.syntax.*
import io.circe.generic.auto.*

case class CommentQueryByUserMessagePlanner(userId: Int, override val planContext: PlanContext) extends Planner[String] {
  override def plan(using PlanContext): IO[String] = {
    queryCommentByUser(userId).map(_.asJson.noSpaces)
  }
}
