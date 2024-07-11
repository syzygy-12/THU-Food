package Impl

import Common.API.{PlanContext, Planner}
import Utils.ScoreHistogramFlipUtils.flipScoreHistogram
import cats.effect.IO
import io.circe.generic.auto.*

case class ScoreHistogramFlipMessagePlanner(score: Int, userId: Int, objectId: Int, override val planContext: PlanContext) extends Planner[Unit] {
  override def plan(using PlanContext): IO[Unit] = {
    flipScoreHistogram(score, userId, objectId)
  }
}
