package Impl

import Common.API.{PlanContext, Planner}
import Utils.CardInfoQueryByIdListUtils.cardInfoQueryByIdList
import cats.effect.IO
import io.circe.Encoder
import io.circe.generic.auto.*
import io.circe.syntax.*

case class CardInfoQueryByIdListMessagePlanner(idList: List[Int], override val planContext: PlanContext) extends Planner[String] {
  override def plan(using planContext: PlanContext): IO[String] = {
    cardInfoQueryByIdList(idList).map(_.asJson.noSpaces)
  }
}
