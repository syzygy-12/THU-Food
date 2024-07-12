package Utils

import Common.API.PlanContext
import Common.DBAPI.{readDBBoolean, writeDB}
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import cats.effect.IO
import io.circe.generic.auto.*

object CommentModifyUtils {
  def commentModify(id: Int, content: String)(using planContext: PlanContext): IO[Unit] = {
    // 查询数据库中的记录
    val checkNodeExists = readDBBoolean(s"SELECT EXISTS(SELECT 1 FROM ${schemaName}.${tableName} WHERE id = ?)",
      List(SqlParameter("Int", id.toString))
    )

    checkNodeExists.flatMap { exists =>
      if (!exists) {
        IO.raiseError(new Exception("Cannot find the comment"))
      } else {
        writeDB(s"UPDATE ${schemaName}.${tableName} SET content = ? WHERE id = ?",
          List(
            SqlParameter("String", content),
            SqlParameter("Int", id.toString)
          )
        ).map(_ => IO.unit)
      }
    }
  }
}
