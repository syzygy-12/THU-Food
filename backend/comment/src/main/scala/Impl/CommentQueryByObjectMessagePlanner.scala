package Impl

import Common.API.{PlanContext, Planner}
import Utils.CommentObjectByEntryUtils.queryCommentByEntry
import cats.effect.IO
import io.circe.generic.auto.*
import io.circe.syntax.*

case class CommentQueryByObjectMessagePlanner(entryId: Int, commentType: Int, override val planContext: PlanContext) extends Planner[String] {
  override def plan(using PlanContext): IO[String] = {
    queryCommentByEntry(entryId, commentType).map(_.asJson.noSpaces)
  }
}