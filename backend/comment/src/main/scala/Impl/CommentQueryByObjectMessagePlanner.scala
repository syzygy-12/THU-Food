package Impl

import Common.API.{PlanContext, Planner}
import Utils.CommentQueryByObjectUtils.queryCommentByObject
import cats.effect.IO
import io.circe.Encoder
import io.circe.generic.auto.*
import io.circe.syntax.*

case class CommentQueryByObjectMessagePlanner(objectId: Int, commentType: Int, override val planContext: PlanContext) extends Planner[String] {
  override def plan(using PlanContext): IO[String] = {
    queryCommentByObject(objectId, commentType).map(_.asJson.noSpaces)
  }
}
