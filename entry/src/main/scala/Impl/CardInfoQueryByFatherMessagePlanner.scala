package Impl

import Common.API.{PlanContext, Planner}
import Utils.CardInfoQueryByFatherUtils.cardInfoQueryByFather
import cats.effect.IO
import io.circe.Encoder
import io.circe.generic.auto.*
import io.circe.syntax.*

case class CardInfoQueryByFatherMessagePlanner(fatherID: Int, override val planContext: PlanContext) extends Planner[String] {
  override def plan(using planContext: PlanContext): IO[String] = {
    cardInfoQueryByFather(fatherID).map(_.asJson.noSpaces)
  }
}
