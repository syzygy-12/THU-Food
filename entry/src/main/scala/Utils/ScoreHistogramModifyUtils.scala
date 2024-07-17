package Utils

import Common.API.PlanContext
import Common.DBAPI.{readDBBoolean, writeDB}
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import cats.effect.IO
import io.circe.generic.auto.*

object ScoreHistogramModifyUtils {
  def scoreHistogramModify(id: Int, scoreHistogram: Array[Int])(using planContext: PlanContext): IO[Boolean] = {
    // 查询数据库中的记录
    val checkNodeExists = readDBBoolean(s"SELECT EXISTS(SELECT 1 FROM ${schemaName}.${tableName} WHERE id = ?)",
      List(SqlParameter("Int", id.toString))
    )

    checkNodeExists.flatMap { exists =>
      if (!exists) {
        IO(false)
      } else {
        writeDB(
          s"""
             |UPDATE ${schemaName}.${tableName}
             |SET score_histogram = ARRAY[${scoreHistogram.mkString(",")}]
             |WHERE id = ?""".stripMargin,
          List(
            SqlParameter("Int", id.toString)
          )
        ).map(_ => true)
      }
    }
  }
}
