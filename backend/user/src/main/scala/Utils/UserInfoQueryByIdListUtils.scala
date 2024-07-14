package Utils

import Common.API.PlanContext
import Common.DBAPI.*
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import Models.UserInfo
import cats.effect.IO
import io.circe.generic.auto.*
import io.circe.parser.*
import cats.implicits.*

object UserInfoQueryByIdListUtils {
  def userInfoByIdListQuery(idList: List[Int])(using planContext: PlanContext) : IO[List[UserInfo]] = {
    val query = readDBRows(
      s"""SELECT nickname, avatar, authority FROM \"${schemaName}\".user_info WHERE id IN (${idList.mkString(",")})""",
      List()
    )
    query.flatMap { rows =>
      val userInfos = rows.map { json =>
        decode[UserInfo](json.noSpaces) match {
          case Right(userInfo) => IO.pure(userInfo)
          case Left(error) => IO.raiseError[UserInfo](new Exception(s"Cannot decode cardInfo: $error"))
        }
      }
      userInfos.sequence
    }
  }
}