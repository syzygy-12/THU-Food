package Impl

import Common.API.{PlanContext, Planner}
import Utils.LikesQueryUtils.queryLikes
import cats.effect.IO
import io.circe.Encoder
import io.circe.generic.auto.*
import io.circe.syntax.*

case class CommentLikesQueryMessagePlanner(id: Int, override val planContext: PlanContext) extends Planner[Int] {
  override def plan(using PlanContext): IO[Int] = {
    queryLikes(id)
  }
}
