package Impl

import Common.API.{PlanContext, Planner}
import Common.DBAPI.{readDBBoolean, writeDB}
import Common.Object.SqlParameter
import Common.ServiceUtils.schemaName
import cats.effect.IO
import io.circe.generic.auto.*

case class NodeModifyMessagePlanner(id: Int, info: String, override val planContext: PlanContext) extends Planner[String]:
  override def plan(using PlanContext): IO[String] = {
    val checkNodeExists = readDBBoolean(s"SELECT EXISTS(SELECT 1 FROM ${schemaName}.node_info WHERE id = ?)",
      List(SqlParameter("Int", Integer.toString(id)))
    )
    checkNodeExists.flatMap { exists =>
      if (!exists) {
        IO.raiseError(new Exception("record not found"))
      } else {
        writeDB(s"UPDATE ${schemaName}.node_info SET info = ? WHERE id = ?",
          List(SqlParameter("Json", info),
            SqlParameter("Int", Integer.toString(id)))
        ).map(_ => "Update successful")
      }
    }
  }

