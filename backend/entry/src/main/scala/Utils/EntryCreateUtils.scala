package Utils

import Common.API.PlanContext
import Common.DBAPI.{ReadDBRowsMessage, readDBRows}
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import Utils.CardInfoQueryUtils.cardInfoQuery
import io.circe.Json
import io.circe.generic.auto.*

object EntryCreateUtils {

  import cats.effect.IO
  import cats.syntax.all._

  private def getFatherPath(fatherID: Int)(using planContext: PlanContext): IO[String] = {
    val fatherInfoIO = cardInfoQuery(fatherID)

    fatherInfoIO.map { fatherCardInfo =>
      fatherCardInfo.path + fatherCardInfo.name + "/"
    }.handleError(_ => "")
  }

  def entryCreate(fatherID: Int, grandfatherID: Int)(using planContext: PlanContext): IO[Int] = {
    for {
      fatherPath <- getFatherPath(fatherID)
      query =
        s"""
           |INSERT INTO ${schemaName}.${tableName}
           |(father_id, grandfather_id, name, path, stars, score_histogram, is_hidden, is_new, is_food, article, image)
           |VALUES (?, ?, ?, ?, 0, '{0,0,0,0,0}', TRUE, TRUE, FALSE, ?, ?)
           |RETURNING id""".stripMargin
      parameters = List(
        SqlParameter("Int", fatherID.toString),
        SqlParameter("Int", grandfatherID.toString),
        SqlParameter("String", "new"),
        SqlParameter("String", fatherPath),
        SqlParameter("String", "empty"),
        SqlParameter("String", "emptyImage")
      )
      result <- readDBRows(query, parameters)
      id <- result match {
        case head :: _ =>
          IO(head.hcursor.get[Int]("id").getOrElse(throw new Exception("Cannot fetch ID")))
        case _ =>
          IO.raiseError(new Exception("Insert operation failed"))
      }
    } yield id
  }

}
