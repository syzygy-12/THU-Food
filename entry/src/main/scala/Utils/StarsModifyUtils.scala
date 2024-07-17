package Utils

import Common.API.PlanContext
import Common.DBAPI.{readDBBoolean, writeDB}
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import cats.effect.IO
import io.circe.generic.auto.*

object StarsModifyUtils {
  def starsModify(id: Int, likes: Int)(using planContext: PlanContext): IO[Boolean] = {
    // 查询数据库中的记录
    val ret = writeDB(s"UPDATE ${schemaName}.${tableName} SET stars = ? WHERE id = ?",
      List(
        SqlParameter("Int", likes.toString),
        SqlParameter("Int", id.toString)
      )
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
