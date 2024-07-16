package Utils

import Common.API.PlanContext
import Common.DBAPI.*
import Common.Object.SqlParameter
import Common.ServiceUtils.schemaName
import Utils.TokenUserIdQueryUtils.queryTokenUserId
import cats.effect.IO
import io.circe.generic.auto.deriveEncoder

object UserNicknameChangeUtils {
  def userNicknameChange(id: Int, newNickname: String, token: String)(using planContext: PlanContext) : IO[Unit] = {
    readDBBoolean(
      s"SELECT EXISTS(SELECT 1 FROM \"${schemaName}\".user_info WHERE id = ?)",
      List(SqlParameter("Int", id.toString))
    ).flatMap { exist =>
      if (exist) {
        val updateQuery = s"UPDATE \"${schemaName}\".user_info SET nickname = ? WHERE id = ?"
        val updateParameters = List(
          SqlParameter("String", newNickname),
          SqlParameter("Int", id.toString)
        )
        writeDB(updateQuery, updateParameters).map(_ => IO.unit)
      } else {
        IO.unit
      }
    }
  }
}