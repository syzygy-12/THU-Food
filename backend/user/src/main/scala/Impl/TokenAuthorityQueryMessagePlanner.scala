package Impl

import Common.API.{PlanContext, Planner}
import Utils.TokenAuthorityQueryUtils.queryTokenAuthority
import cats.effect.IO
import io.circe.generic.auto.*

case class TokenAuthorityQueryMessagePlanner(token: String, override val planContext: PlanContext) extends Planner[Int]:
  override def plan(using planContext: PlanContext): IO[Int] = {
    queryTokenAuthority(token)
  }
