package Impl

import Common.API.{PlanContext, Planner}
import Utils.CommentQueryByEntryUtils.queryCommentByEntry
import cats.effect.IO
import io.circe.generic.auto.*
import io.circe.syntax.*

case class CommentQueryByEntryMessagePlanner(entryId: Int, override val planContext: PlanContext) extends Planner[String] {
  override def plan(using PlanContext): IO[String] = {
    queryCommentByEntry(entryId).map(_.asJson.noSpaces)
  }
}