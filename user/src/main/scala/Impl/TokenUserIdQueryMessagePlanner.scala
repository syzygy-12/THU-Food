package Impl

import Common.API.{PlanContext, Planner}
import Utils.TokenUserIdQueryUtils.queryTokenUserId
import cats.effect.IO
import io.circe.generic.auto.*

case class TokenUserIdQueryMessagePlanner(token: String, override val planContext: PlanContext) extends Planner[Int]:
  override def plan(using planContext: PlanContext): IO[Int] = {
    queryTokenUserId(token)
  }
