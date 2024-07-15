package Utils

import Common.API.PlanContext
import Common.DBAPI.{readDBBoolean, writeDB}
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import cats.effect.IO
import io.circe.generic.auto.*

object AdModifyUtils {
  def adModify(id: Int, entryId: Int, image: String)(using planContext: PlanContext): IO[Unit] = {
    // 查询数据库中的记录
    val checkNodeExists = readDBBoolean(s"SELECT EXISTS(SELECT 1 FROM ${schemaName}.${tableName} WHERE id = ?)",
      List(SqlParameter("Int", id.toString))
    )

    checkNodeExists.flatMap { exists =>
      if (!exists) {
        IO.raiseError(new Exception("Cannot find the Ad"))
      } else {
        writeDB(s"UPDATE ${schemaName}.${tableName} SET entryid = ?, image = ? WHERE id = ?",
          List(
            SqlParameter("Int", entryId.toString),
            SqlParameter("String", image),
            SqlParameter("Int", id.toString)
          )
        ).map(_ => IO.unit)
      }
    }
  }
}
