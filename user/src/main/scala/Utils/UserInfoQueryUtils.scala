package Utils

import Common.ServiceUtils.schemaName
import Models.UserInfo
import cats.effect.IO
import Common.API.PlanContext
import Common.DBAPI.*
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import io.circe.generic.auto.*
import io.circe.parser.*

object UserInfoQueryUtils {
  def userInfoQuery(id: Int)(using planContext: PlanContext) : IO[UserInfo] = {
    val query = readDBRows(
      s"SELECT nickname, avatar, authority FROM \"${schemaName}\".user_info WHERE id = ?",
      List(SqlParameter("Int", id.toString))
    )
    query.flatMap {
      case head :: _ =>
        decode[UserInfo](head.noSpaces) match {
          case Right(userInfo) => IO.pure(userInfo)
          case Left(error) => IO.raiseError(new Exception(s"Cannot decode cardInfo: $error"))
        }
      case Nil => IO.raiseError(new Exception("Cannot fetch cardInfo"))
    }
  }
}