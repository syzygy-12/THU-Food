package Utils

import Common.API.PlanContext
import Common.DBAPI.writeDB
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import cats.effect.IO
import io.circe.generic.auto.*

object CommentDeleteUtils {
  def commentDelete(id: Int)(using planContext: PlanContext): IO[Unit] = {
    writeDB(
      s"DELETE FROM ${schemaName}.${tableName} WHERE id = ?",
      List(SqlParameter("Int", id.toString))
    ).map(_ => IO.unit)
  }
}
