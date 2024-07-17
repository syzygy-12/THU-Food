package Utils

import Common.API.PlanContext
import Common.DBAPI.{readDBBoolean, writeDB}
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import cats.effect.IO
import io.circe.generic.auto.*

object IsNewModifyUtils {
  def isNewModify(id: Int, isNew: Boolean)(using planContext: PlanContext): IO[Boolean] = {
    // 查询数据库中的记录
    val ret = writeDB(s"UPDATE ${schemaName}.${tableName} SET is_new = ${isNew.toString} WHERE id = ?",
      List(SqlParameter("Int", id.toString))
    )

    ret.flatMap { retString =>
      if (retString == "0") {
        IO(false)
      } else {
        IO(true)
      }
    }
  }
}
