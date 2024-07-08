package Utils

import Common.API.PlanContext
import Common.DBAPI.{readDBBoolean, writeDB}
import Common.Object.SqlParameter
import Common.ServiceUtils.{schemaName, tableName}
import Models.Node
import Utils.EntryTestUtils.entryTest
import Utils.NodeUtils.nodeToString
import cats.effect.IO
import io.circe.generic.auto.*

object NodeModifyUtils {

  def nodeModify(id: Int, node: Node)(using planContext: PlanContext): IO[String] = {
    // 查询数据库中的记录
    val checkNodeExists = entryTest(id)

    checkNodeExists.flatMap { exists =>
      if (!exists) {
        IO.raiseError(new Exception("record not found"))
      } else {
        writeDB(s"UPDATE ${schemaName}.${tableName} SET node = ? WHERE id = ?",
          List(
            SqlParameter("Json", nodeToString(node)),
            SqlParameter("Int", id.toString)
          )
        ).map(_ => "Update successful")
      }
    }
  }
}
