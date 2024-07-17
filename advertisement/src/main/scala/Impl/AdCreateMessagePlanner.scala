package Impl

import APIs.UserAPI.TokenAuthorityQueryMessage
import Common.API.{PlanContext, Planner}
import Common.DBAPI.startTransaction
import Utils.AdCreateUtils.adCreate
import cats.effect.IO
import io.circe.generic.auto.*
import Models.*

case class AdCreateMessagePlanner(token: String, override val planContext: PlanContext) extends Planner[Int] {
  override def plan(using PlanContext): IO[Int] = {
    startTransaction {
      val authorityIO = TokenAuthorityQueryMessage(token).send

      authorityIO.flatMap { authority =>
        if (authority == CanteenManagerType || authority == SuperManagerType) {
          adCreate()
        } else {
          IO.raiseError(new Exception("用户权限不足"))
        }
      }
    }
  }
}
