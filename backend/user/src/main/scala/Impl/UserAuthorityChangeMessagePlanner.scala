package Impl

import Common.API.{PlanContext, Planner}
import Utils.TokenAuthorityQueryUtils.queryTokenAuthority
import Utils.UserAuthorityChangeUtils.userAuthorityChange
import cats.effect.IO
import io.circe.generic.auto.*
import Models.*

case class UserAuthorityChangeMessagePlanner(userName: String, newAuthority: Int, token: String, override val planContext: PlanContext) extends Planner[Boolean]:
  override def plan(using planContext: PlanContext): IO[Boolean] = {
    val authorityIO = queryTokenAuthority(token);
    authorityIO.flatMap { authority =>
      if (authority == SuperManagerType) {
        userAuthorityChange(userName, newAuthority)
      } else {
        IO.raiseError(new Exception("用户权限不足"))
      }
    }
  }
