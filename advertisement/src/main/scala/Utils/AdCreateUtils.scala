package Utils

import Common.API.PlanContext
import Common.DBAPI.{ReadDBRowsMessage, readDBRows}
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import cats.effect.IO
import io.circe.Json
import io.circe.generic.auto.*

object AdCreateUtils {
  def adCreate()(using planContext: PlanContext): IO[Int] = {
    val query = s"INSERT INTO ${schemaName}.${tableName} (entryid, image) VALUES (0,?) RETURNING id"
    val parameters = List(SqlParameter("String", "emptyImage"))

    readDBRows(query, parameters).flatMap {
      case head :: _ =>
        IO(head.hcursor.get[Int]("id").getOrElse(throw new Exception("Cannot fetch ID")))
      case _ =>
        IO.raiseError(new Exception("Insert operation failed"))
    }
  }
}
