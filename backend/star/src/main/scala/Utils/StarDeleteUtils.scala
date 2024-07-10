package Utils

import Common.API.PlanContext
import Common.DBAPI.writeDB
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import cats.effect.IO
import io.circe.generic.auto.*

object StarDeleteUtils {
  def deleteStar(userId: Int, entryId: Int, starType: Int)(using planContext: PlanContext): IO[String] = {
    writeDB(
      s"DELETE FROM ${schemaName}.${tableName} WHERE userid = ? AND objectid = ? AND startype = ?",
      List(
        SqlParameter("Int", userId.toString),
        SqlParameter("Int", entryId.toString),
        SqlParameter("Int", starType.toString)
      )
    )
  }
}
