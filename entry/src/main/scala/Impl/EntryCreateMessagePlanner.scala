package Impl

import APIs.UserAPI.TokenAuthorityQueryMessage
import Common.API.{PlanContext, Planner}
import cats.effect.IO
import io.circe.generic.auto.*
import Utils.EntryCreateUtils.entryCreate
import Common.DBAPI.startTransaction
import Models.*

case class EntryCreateMessagePlanner(fatherID: Int, grandfatherID: Int, token: String, override val planContext: PlanContext) extends Planner[Int] {
  override def plan(using PlanContext): IO[Int] = {
    startTransaction {
      val authorityIO = TokenAuthorityQueryMessage(token).send

      authorityIO.flatMap { authority =>
        if (authority == CanteenManagerType || authority == SuperManagerType) {
          entryCreate(fatherID, grandfatherID)
        } else {
          IO.raiseError(new Exception("用户权限不足"))
        }
      }
    }
  }
}
