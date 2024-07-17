package Impl

import Common.API.{PlanContext, Planner}
import Utils.StarTestByUserIdAndObjectIdListUtils.testStarByUserIdAndObjectIdList
import Utils.StarTestUtils.testStar
import cats.effect.IO
import io.circe.generic.auto.*

case class StarTestByUserIdAndObjectIdListMessagePlanner(userId: Int, objectIdList: List[Int], starType: Int, override val planContext: PlanContext) extends Planner[String] {
  override def plan(using PlanContext): IO[String] = {
    testStarByUserIdAndObjectIdList(userId, objectIdList, starType)
  }
}
