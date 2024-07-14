package Impl

import Common.API.{PlanContext, Planner}
import Utils.UserAvatarChangeUtils.userAvatarChange
import cats.effect.IO
import io.circe.generic.auto.*

case class UserAvatarChangeMessagePlanner(id: Int, newAvatar: String, override val planContext: PlanContext) extends Planner[Unit]:
  override def plan(using planContext: PlanContext): IO[Unit] = {
    userAvatarChange(id,newAvatar)
  }
