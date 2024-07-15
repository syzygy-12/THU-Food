package Utils

import Common.API.PlanContext
import Common.DBAPI.{readDBBoolean, readDBRows, writeDB}
import Common.Object.SqlParameter
import Common.ServiceUtils.schemaName
import cats.effect.IO
import io.circe.generic.auto.deriveEncoder

object TokenDeleteUtils {
  def deleteToken(token: String)(using planContext: PlanContext) : IO[Unit] = {
    writeDB(
      s"DELETE FROM \"${schemaName}\".token WHERE token = ?",
      List(SqlParameter("String", token))
    ).map(_ => IO.unit)
  }
}