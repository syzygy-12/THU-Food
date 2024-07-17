package Impl

import Common.API.{PlanContext, Planner}
import Utils.TokenDeleteUtils.deleteToken
import cats.effect.IO
import io.circe.generic.auto.*

case class TokenDeleteMessagePlanner(token: String, override val planContext: PlanContext) extends Planner[Unit]:
  override def plan(using planContext: PlanContext): IO[Unit] = {
    deleteToken(token)
  }
