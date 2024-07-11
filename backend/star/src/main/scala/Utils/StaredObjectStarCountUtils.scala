package Utils

import Common.API.PlanContext
import Common.DBAPI.{ReadDBRowsMessage, readDBRows}
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import cats.effect.IO
import io.circe.{Decoder, HCursor, Json}
import io.circe.generic.auto.*
import io.circe.parser.*

object StaredObjectStarCountUtils {
  def queryStarNumber(objectId: Int, starType: Int)(using planContext: PlanContext): IO[Int] = {
    val query = s"SELECT COUNT(*) as count FROM ${schemaName}.${tableName} WHERE objectid = ? AND startype = ?"
    val parameters = List(
      SqlParameter("Int", objectId.toString),
      SqlParameter("Int", starType.toString)
    )

    readDBRows(query, parameters).map { rows =>
      rows.head.hcursor.get[Int]("count").getOrElse(0)
    }
  }
}
