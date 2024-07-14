package Impl

import Common.API.{PlanContext, Planner}
import Utils.UserAuthorityChangeUtils.userAuthorityChange
import cats.effect.IO
import io.circe.generic.auto.*

case class UserAuthorityChangeMessagePlanner(userName: String, newAuthority: Int, override val planContext: PlanContext) extends Planner[Boolean]:
  override def plan(using planContext: PlanContext): IO[Boolean] = {
    userAuthorityChange(userName, newAuthority)
  }
