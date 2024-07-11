package Utils

import Common.API.PlanContext
import Common.DBAPI.{readDBBoolean, writeDB}
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import cats.effect.IO
import io.circe.generic.auto.*

object LikesModifyUtils {
  def likesModify(id: Int, likes: Int)(using planContext: PlanContext): IO[Boolean] = {
    // 查询数据库中的记录
    val checkNodeExists = readDBBoolean(s"SELECT EXISTS(SELECT 1 FROM ${schemaName}.${tableName} WHERE id = ?)",
      List(SqlParameter("Int", id.toString))
    )

    checkNodeExists.flatMap { exists =>
      if (!exists) {
        IO(false)
      } else {
        writeDB(s"UPDATE ${schemaName}.${tableName} SET likes = ? WHERE id = ?",
          List(
            SqlParameter("Int", likes.toString),
            SqlParameter("Int", id.toString)
          )
        ).map(_ => true)
      }
    }
  }
}
