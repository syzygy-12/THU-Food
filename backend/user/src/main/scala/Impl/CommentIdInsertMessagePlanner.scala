package Impl

import Common.API.{PlanContext, Planner}
import Utils.CommentIdInsertUtils.commentIdInsert
import cats.effect.IO
import io.circe.Encoder
import io.circe.generic.auto.*
import io.circe.syntax.*

case class CommentIdInsertMessagePlanner(userId: Int, newCommentId: Int, override val planContext: PlanContext) extends Planner[String] {
  override def plan(using planContext: PlanContext): IO[String] = {
    commentIdInsert(userId, newCommentId).map(_.asJson.noSpaces)
  }
}
