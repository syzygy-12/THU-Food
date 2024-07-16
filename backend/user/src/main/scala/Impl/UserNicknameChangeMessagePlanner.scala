package Impl

import Common.API.{PlanContext, Planner}
import Utils.TokenUserIdQueryUtils.queryTokenUserId
import Utils.UserNicknameChangeUtils.userNicknameChange
import cats.effect.IO
import io.circe.generic.auto.*

case class UserNicknameChangeMessagePlanner(id: Int, newNickname: String, token: String, override val planContext: PlanContext) extends Planner[Unit]:
  override def plan(using planContext: PlanContext): IO[Unit] = {
    val userIdIO = queryTokenUserId(token);
    userIdIO.flatMap { userId =>
      if (userId == id) {
        userNicknameChange(id, newNickname, token);
      } else {
        IO.raiseError(new Exception("Token 与用户不匹配"))
      }
    }
  }
