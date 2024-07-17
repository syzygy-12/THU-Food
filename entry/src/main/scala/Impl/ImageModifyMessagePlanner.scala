package Impl

import APIs.UserAPI.TokenAuthorityQueryMessage
import Common.API.{PlanContext, Planner}
import Common.DBAPI.startTransaction
import Utils.ImageModifyUtils.imageModify
import cats.effect.IO
import io.circe.generic.auto.*
import Models.*

case class ImageModifyMessagePlanner(id: Int, newImage: String, token: String, override val planContext: PlanContext) extends Planner[Boolean] {
  override def plan(using PlanContext): IO[Boolean] = {
    startTransaction {
      val authorityIO = TokenAuthorityQueryMessage(token).send

      authorityIO.flatMap { authority =>
        if (authority == CanteenManagerType || authority == SuperManagerType) {
          imageModify(id, newImage)
        } else {
          IO.raiseError(new Exception("用户权限不足"))
        }
      }
    }
  }
}
