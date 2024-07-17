package Impl

import Common.API.{PlanContext, Planner}
import Utils.CardInfoQueryBySearchUtils.cardInfoQueryBySearch
import cats.effect.IO
import io.circe.Encoder
import io.circe.generic.auto.*
import io.circe.syntax.*

case class CardInfoQueryBySearchMessagePlanner(word: String, override val planContext: PlanContext) extends Planner[String] {
  override def plan(using planContext: PlanContext): IO[String] = {
    cardInfoQueryBySearch(word).map(_.asJson.noSpaces)
  }
}
