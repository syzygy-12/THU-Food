package Impl

import APIs.UserAPI.TokenAuthorityQueryMessage
import Common.API.{PlanContext, Planner}
import Common.DBAPI.startTransaction
import Utils.IsNewModifyUtils.isNewModify
import cats.effect.IO
import io.circe.generic.auto.*
import Models.*

case class IsNewModifyMessagePlanner(id: Int, isNew: Boolean, token: String, override val planContext: PlanContext) extends Planner[Boolean] {
  override def plan(using PlanContext): IO[Boolean] = {
    startTransaction {
      val authorityIO = TokenAuthorityQueryMessage(token).send

      authorityIO.flatMap { authority =>
        if (authority == CanteenManagerType || authority == SuperManagerType) {
          isNewModify(id, isNew)
        } else {
          IO.raiseError(new Exception("用户权限不足"))
        }
      }
    }
  }
}
