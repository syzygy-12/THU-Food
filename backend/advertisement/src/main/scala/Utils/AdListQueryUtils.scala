package Utils

import Common.API.PlanContext
import Common.DBAPI.{readDBBoolean, readDBRows, writeDB}
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import Models.Advertisement
import cats.effect.IO
import io.circe.generic.auto.*

object AdListQueryUtils {
  def adListQuery()(using planContext: PlanContext): IO[List[Advertisement]] = {
    val query = readDBRows(
      s"SELECT id, entryid, image FROM ${schemaName}.${tableName}",
      List()
    )
    query.map { rows =>
      rows.map { row =>
        val id = row.hcursor.get[Int]("id").getOrElse(throw new Exception("Cannot fetch id"))
        val entryId = row.hcursor.get[Int]("entryid").getOrElse(throw new Exception("Cannot fetch entryid"))
        val image = row.hcursor.get[String]("image").getOrElse(throw new Exception("Cannot fetch image"))
        Advertisement(id, entryId, image)
      }
    }
  }
}
