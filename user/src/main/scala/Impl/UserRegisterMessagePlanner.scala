package Impl

import cats.effect.IO
import io.circe.generic.auto.*
import Common.API.{PlanContext, Planner}
import Utils.UserRegisterUtils.userRegister

case class UserRegisterMessagePlanner(userName: String, password: String, override val planContext: PlanContext) extends Planner[Boolean]:
  override def plan(using planContext: PlanContext): IO[Boolean] = {
    userRegister(userName, password)
  }
