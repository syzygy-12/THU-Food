package Impl

import Common.API.{PlanContext, Planner}
import Utils.ImageModifyUtils.imageModify
import cats.effect.IO
import io.circe.generic.auto.*

case class ImageModifyMessagePlanner(id: Int, newImage: String, override val planContext: PlanContext) extends Planner[Boolean] {
  override def plan(using PlanContext): IO[Boolean] = {
    imageModify(id, newImage)
  }
}
