package Utils

import Common.API.PlanContext
import Common.DBAPI.{ReadDBRowsMessage, readDBRows}
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import cats.effect.IO
import io.circe.Json
import io.circe.generic.auto.*
import io.circe.syntax.*

object EntryCreateUtils {

  def entryCreate(fatherId: Int, grandfatherId: Int)(using planContext: PlanContext): IO[Int] = {

    val query = s"INSERT INTO ${schemaName}.${tableName} (fatherid, grandfatherid, name, stars, scorehistogram) VALUES (?, ?, ?, 0, '{0,0,0,0,0}') RETURNING id"
    val parameters = List(
      SqlParameter("Int", fatherId.toString),
      SqlParameter("Int", grandfatherId.toString),
      SqlParameter("String", "new")
    )

    readDBRows(query, parameters).flatMap {
      case head :: _ =>
        IO(head.hcursor.get[Int]("id").getOrElse(throw new Exception("Cannot fetch ID")))
      case _ =>
        IO.raiseError(new Exception("Insert operation failed"))
    }
  }
}
