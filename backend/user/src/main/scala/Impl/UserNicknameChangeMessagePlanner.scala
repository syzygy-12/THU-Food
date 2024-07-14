package Impl

import Common.API.{PlanContext, Planner}
import Utils.UserNicknameChangeUtils.userNicknameChange
import cats.effect.IO
import io.circe.generic.auto.*

case class UserNicknameChangeMessagePlanner(id: Int, newNickname: String, override val planContext: PlanContext) extends Planner[Unit]:
  override def plan(using planContext: PlanContext): IO[Unit] = {
    userNicknameChange(id, newNickname)
  }
