package Utils

import Common.API.PlanContext
import Common.DBAPI.{readDBBoolean, writeDB}
import Common.Object.SqlParameter
import Common.ServiceUtils.{schemaName, tableName}
import cats.effect.IO
import io.circe.generic.auto.*

object CommentIdListModifyUtils {

  def commentIdListModify(id: Int, commentIdList: Array[Int])(using planContext: PlanContext): IO[String] = {
    // 查询数据库中的记录
      writeDB(
        s"UPDATE \"${schemaName}\".\"${tableName}\" SET \"commentIdList\" = string_to_array(?, ',')::int[] WHERE id = ?",
        List(
          SqlParameter("String", commentIdList.mkString(",")),
          SqlParameter("Int", id.toString)
        )
      ).map(_ => "Update successful")
  }
}
