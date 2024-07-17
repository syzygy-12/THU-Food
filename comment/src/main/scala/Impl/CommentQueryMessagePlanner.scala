package Impl

import Common.API.{PlanContext, Planner}
import Utils.CommentQueryByIdListUtils.queryCommentByIdList
import Utils.CommentQueryUtils.queryComment
import cats.effect.IO
import io.circe.generic.auto.*
import io.circe.syntax.*

case class CommentQueryMessagePlanner(userId: Int, objectId: Int, commentType: Int, override val planContext: PlanContext) extends Planner[String] {
  override def plan(using PlanContext): IO[String] = {
    queryComment(userId, objectId, commentType).map(_.asJson.noSpaces)
  }
}
