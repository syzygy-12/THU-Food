package Impl

import Common.API.{PlanContext, Planner}
import cats.effect.IO
import io.circe.generic.auto.*
import Utils.UserPasswordChangeUtils.userPasswordChange

case class UserPasswordChangeMessagePlanner(userId: Int, password: String, newPassword: String, override val planContext: PlanContext) extends Planner[Boolean]:
  override def plan(using planContext: PlanContext): IO[Boolean] = {
    userPasswordChange(userId, password, newPassword)
  }
