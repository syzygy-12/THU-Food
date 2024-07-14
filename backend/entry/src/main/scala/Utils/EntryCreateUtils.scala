package Utils

import Common.API.PlanContext
import Common.DBAPI.{ReadDBRowsMessage, readDBRows}
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import cats.effect.IO
import io.circe.Json
import io.circe.generic.auto.*

object EntryCreateUtils {

  def entryCreate(fatherID: Int, grandfatherID: Int)(using planContext: PlanContext): IO[Int] = {

    val query =
      s"""
         |INSERT INTO ${schemaName}.${tableName}
         |(father_id, grandfather_id, name, stars, score_histogram, is_hidden, is_new, is_food, article, image)
         |VALUES (?, ?, ?, 0, '{0,0,0,0,0}', TRUE, TRUE, FALSE, ?, ?)
         |RETURNING id""".stripMargin
    val parameters = List(
      SqlParameter("Int", fatherID.toString),
      SqlParameter("Int", grandfatherID.toString),
      SqlParameter("String", "new"),
      SqlParameter("String", "empty"),
      SqlParameter("String", "emptyImage")
    )

    readDBRows(query, parameters).flatMap {
      case head :: _ =>
        IO(head.hcursor.get[Int]("id").getOrElse(throw new Exception("Cannot fetch ID")))
      case _ =>
        IO.raiseError(new Exception("Insert operation failed"))
    }
  }
}
