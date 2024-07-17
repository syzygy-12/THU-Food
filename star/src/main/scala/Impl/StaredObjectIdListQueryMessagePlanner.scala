package Impl

import Common.API.{PlanContext, Planner}
import Utils.StaredObjectIdListQueryUtils.queryStaredObjectIdList
import cats.effect.IO
import io.circe.Encoder
import io.circe.generic.auto.*
import io.circe.syntax.*

case class StaredObjectIdListQueryMessagePlanner(userId: Int, starType: Int, override val planContext: PlanContext) extends Planner[String] {
  override def plan(using planContext: PlanContext): IO[String] = {
    queryStaredObjectIdList(userId, starType).map(_.asJson.noSpaces)
  }
}
