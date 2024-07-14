package Impl

import Common.API.{PlanContext, Planner}
import Utils.UserInfoQueryUtils.userInfoQuery
import cats.effect.IO
import io.circe.Encoder
import io.circe.generic.auto.*
import io.circe.syntax.*

case class UserInfoQueryMessagePlanner(id: Int, override val planContext: PlanContext) extends Planner[String]:
  override def plan(using planContext: PlanContext): IO[String] = {
    userInfoQuery(id).map(_.asJson.noSpaces)
  }
