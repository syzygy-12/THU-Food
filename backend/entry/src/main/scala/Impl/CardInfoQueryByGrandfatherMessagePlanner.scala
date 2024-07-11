package Impl

import Common.API.{PlanContext, Planner}
import Utils.CardInfoQueryByGrandfatherUtils.cardInfoQueryByGrandfather
import cats.effect.IO
import io.circe.Encoder
import io.circe.generic.auto.*
import io.circe.syntax.*

case class CardInfoQueryByGrandfatherMessagePlanner(grandfatherId: Int, override val planContext: PlanContext) extends Planner[String] {
  override def plan(using planContext: PlanContext): IO[String] = {
    cardInfoQueryByGrandfather(grandfatherId).map(_.asJson.noSpaces)
  }
}
