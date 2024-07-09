package Impl

import cats.effect.IO
import io.circe.generic.auto.*
import io.circe.syntax.*
import Common.API.{PlanContext, Planner}
import Utils.UserLoginUtils.userLogin

case class UserLoginMessagePlanner(userName: String, password: String, override val planContext: PlanContext) extends Planner[String] {
  override def plan(using planContext: PlanContext): IO[String] = {
    userLogin(userName, password).map { response =>
      response.asJson.noSpaces
    }
  }
}
