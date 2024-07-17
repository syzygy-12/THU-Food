package Utils

import Common.API.PlanContext
import Common.DBAPI.{ReadDBRowsMessage, readDBRows}
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import cats.effect.IO
import io.circe.generic.auto.*
import io.circe.parser.*
import io.circe.{Decoder, HCursor, Json}

object LikesQueryUtils {
  def queryLikes(id: Int)(using planContext: PlanContext): IO[Int] = {
    val query = s"SELECT likes FROM ${schemaName}.${tableName} WHERE id = ?"
    val parameters = List(
      SqlParameter("Int", id.toString)
    )

    readDBRows(query, parameters).map { rows =>
      rows.headOption.flatMap(_.hcursor.get[Int]("likes").toOption).getOrElse(0)
    }
  }
}
