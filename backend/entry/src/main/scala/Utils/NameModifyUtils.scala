package Utils

import Common.API.PlanContext
import Common.DBAPI.{readDBBoolean, writeDB}
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import Utils.CardInfoQueryUtils.cardInfoQuery
import Utils.PathUpdateUtils.pathUpdate
import cats.effect.IO
import io.circe.generic.auto.*

object NameModifyUtils {
  def nameModify(id: Int, newName: String)(using planContext: PlanContext): IO[Boolean] = {
    // 查询数据库中的记录
    val ret = writeDB(s"UPDATE ${schemaName}.${tableName} SET name = ? WHERE id = ?",
      List(
        SqlParameter("String", newName),
        SqlParameter("Int", id.toString)
      )
    )

    ret.flatMap { retString =>
      if (retString == "0") {
        IO(false)
      } else {
        for {
          info <- cardInfoQuery(id)
          _ <- pathUpdate(id, info.path + info.name + "/")
        } yield true
      }
    }
  }
}
