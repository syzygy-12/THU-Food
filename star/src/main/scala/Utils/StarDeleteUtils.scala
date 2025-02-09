package Utils

import Common.API.PlanContext
import Common.DBAPI.writeDB
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import cats.effect.IO
import io.circe.generic.auto.*

object StarDeleteUtils {
  def deleteStar(userId: Int, objectId: Int, starType: Int)(using planContext: PlanContext): IO[Unit] = {
    writeDB(
      s"DELETE FROM ${schemaName}.${tableName} WHERE userid = ? AND objectid = ? AND startype = ?",
      List(
        SqlParameter("Int", userId.toString),
        SqlParameter("Int", objectId.toString),
        SqlParameter("Int", starType.toString)
      )
    ).map(_ => ())
  }
}
