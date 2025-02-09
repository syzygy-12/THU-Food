package Impl

import Common.API.{PlanContext, Planner}
import Utils.CardInfoQueryByGrandfatherUtils.cardInfoQueryByGrandfather
import cats.effect.IO
import io.circe.Encoder
import io.circe.generic.auto.*
import io.circe.syntax.*

case class CardInfoQueryByGrandfatherMessagePlanner(grandfatherID: Int, override val planContext: PlanContext) extends Planner[String] {
  override def plan(using planContext: PlanContext): IO[String] = {
    cardInfoQueryByGrandfather(grandfatherID).map(_.asJson.noSpaces)
  }
}
