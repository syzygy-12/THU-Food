package Impl

import Common.API.{PlanContext, Planner}
import Models.Node
import Utils.CommentIdInsertUtils.commentIdInsert
import cats.effect.IO
import io.circe.Encoder
import io.circe.generic.auto.*
import io.circe.syntax.*

case class CommentIdInsertMessagePlanner(id: Int, newCommentId: Int, override val planContext: PlanContext) extends Planner[Int] {
  override def plan(using planContext: PlanContext): IO[Int] = {
    commentIdInsert(id, newCommentId)
  }
}