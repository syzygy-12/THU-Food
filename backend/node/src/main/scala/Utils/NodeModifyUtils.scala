package Utils

import Common.API.PlanContext
import Common.DBAPI.{readDBBoolean, writeDB}
import Common.Object.SqlParameter
import Common.ServiceUtils.schemaName
import Models.Node
import cats.effect.IO
import io.circe.generic.auto.*

object NodeModifyUtils {

  def nodeModify(id: Int, node: Node)(using planContext: PlanContext): IO[String] = {
    // 查询数据库中的记录
    val checkNodeExists = readDBBoolean(s"SELECT EXISTS(SELECT 1 FROM ${schemaName}.node_info WHERE id = ?)",
      List(SqlParameter("Int", Integer.toString(id)))
    )
    checkNodeExists.flatMap { exists =>
      if (!exists) {
        IO.raiseError(new Exception("record not found"))
      } else {
        writeDB(s"UPDATE ${schemaName}.node_info SET \"fatherId\" = ?, son = CAST(? AS INTEGER[]), \"entryId\" = ? WHERE id = ?",
          List(
            SqlParameter("Int", node.fatherId.toString),
            SqlParameter("String", node.son.mkString("{",",","}")),
            SqlParameter("Int", node.entryId.toString),
            SqlParameter("Int", node.id.toString)
          )
        ).map(_ => "Update successful")
      }
    }
  }
}
