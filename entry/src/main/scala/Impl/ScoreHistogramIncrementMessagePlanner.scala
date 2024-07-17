package Impl

import Common.API.{PlanContext, Planner}
import Utils.CardInfoQueryUtils.cardInfoQuery
import Utils.ScoreHistogramModifyUtils.scoreHistogramModify
import cats.effect.IO
import io.circe.generic.auto.*

case class ScoreHistogramIncrementMessagePlanner(id: Int, score: Int, delta: Int, override val planContext: PlanContext) extends Planner[Boolean] {
  override def plan(using PlanContext): IO[Boolean] = {
    for {
      cardInfo <- cardInfoQuery(id);
      scoreHistogram = cardInfo.scoreHistogram;
      _ = scoreHistogram(score) += delta
      result <- scoreHistogramModify(id, scoreHistogram)
    } yield result
  }
}
