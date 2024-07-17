package Impl

import Common.API.{PlanContext, Planner}
import Utils.StarsModifyUtils.starsModify
import Utils.CardInfoQueryUtils.cardInfoQuery
import cats.effect.IO
import io.circe.generic.auto.*

case class EntryStarsIncrementMessagePlanner(id: Int, delta: Int, override val planContext: PlanContext) extends Planner[Boolean] {
  override def plan(using PlanContext): IO[Boolean] = {
    for {
      cardInfo <- cardInfoQuery(id)
      stars = cardInfo.stars
      result <- starsModify(id, stars + delta)
    } yield result
  }
}
