package Impl

import APIs.UserAPI.TokenAuthorityQueryMessage
import Common.API.{PlanContext, Planner}
import Common.DBAPI.startTransaction
import Utils.AdModifyUtils.adModify
import cats.effect.IO
import io.circe.generic.auto.*
import Models.*

case class AdModifyMessagePlanner(id: Int, entryId: Int, image: String, token: String, override val planContext: PlanContext) extends Planner[Unit] {
  override def plan(using PlanContext): IO[Unit] = {
    startTransaction {
      val authorityIO = TokenAuthorityQueryMessage(token).send

      authorityIO.flatMap { authority =>
        if (authority == CanteenManagerType || authority == SuperManagerType) {
          adModify(id, entryId, image)
        } else {
          IO.raiseError(new Exception("用户权限不足"))
        }
      }
    }
  }
}
