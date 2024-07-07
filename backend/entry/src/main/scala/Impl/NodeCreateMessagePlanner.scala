package Impl

import Common.API.{PlanContext, Planner}
import Common.DBAPI.{readDBBoolean, readDBRows, readDBString, writeDB}
import Common.Object.SqlParameter
import Common.ServiceUtils.schemaName
import cats.effect.IO
import io.circe.generic.auto.*

import scala.util.Random

case class EntryCreateMessagePlanner(id: Int, info: String, override val planContext: PlanContext) extends Planner[String]:
  override def plan(using PlanContext): IO[String] = {
    val checkUserExists = readDBBoolean(s"SELECT EXISTS(SELECT 1 FROM ${schemaName}.node_info WHERE id = ?)",
      List(SqlParameter("Int", Integer.toString(id)))
    )
    checkUserExists.flatMap { exists =>
      if (exists) {
        IO.raiseError(new Exception("already exists"))
      } else {
        writeDB(s"INSERT INTO ${schemaName}.node_info (id, info) VALUES (?, ?)",
          List(SqlParameter("Int", Integer.toString(id)),
               SqlParameter("Json", info))
        )
      }
    }
  }