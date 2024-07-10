package Impl

import Common.API.{PlanContext, Planner}
import Utils.StaredEntryIdListQueryUtils.queryStaredEntryIdList
import cats.effect.IO
import io.circe.Encoder
import io.circe.generic.auto.*
import io.circe.syntax.*

case class StaredEntryIdListQueryMessagePlanner(userId: Int, override val planContext: PlanContext) extends Planner[String] {
  override def plan(using planContext: PlanContext): IO[String] = {
    queryStaredEntryIdList(userId).map(_.asJson.noSpaces)
  }
}
