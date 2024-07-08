package Utils

import Common.API.PlanContext
import Common.DBAPI.{ReadDBRowsMessage, readDBRows}
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import Models.EntryInit
import Utils.NodeUtils.nodeToString
import cats.effect.IO
import io.circe.Json
import io.circe.generic.auto.*
object EntryCreateUtils {

  def entryCreate()(using planContext: PlanContext): IO[Int] = {

    val query = s"INSERT INTO ${schemaName}.${tableName} (node, name) VALUES (?, ?) RETURNING id"
    val newEntry = EntryInit.newEntry()
    val parameters = List(
        SqlParameter("Json", nodeToString(newEntry.node)),
        SqlParameter("String", newEntry.name),
    )

    readDBRows(query, parameters).flatMap {
      case head :: _ =>
        IO(head.hcursor.get[Int]("id").getOrElse(throw new Exception("Cannot fetch ID")))
      case _ =>
        IO.raiseError(new Exception("Insert operation failed"))
    }
  }
}
