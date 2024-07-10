package Utils

import Common.API.PlanContext
import Common.DBAPI.{ReadDBRowsMessage, readDBRows}
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import cats.effect.IO
import io.circe.generic.auto.*
import io.circe.parser.*
import io.circe.Json
import io.circe.Decoder
import io.circe.HCursor

object StaredEntryIdListQueryUtils {
  def queryStaredEntryIdList(userId: Int)(using planContext: PlanContext): IO[Array[Int]] = {
    val query = s"SELECT entryid FROM ${schemaName}.${tableName} WHERE userid = ?"
    val parameters = List(
      SqlParameter("Int", userId.toString)
    )

    readDBRows(query, parameters).map { rows =>
      rows.map { row =>
        row.hcursor.get[Int]("entryid").getOrElse(throw new Exception("Cannot fetch entryid"))
      }.toArray
    }
  }
}

