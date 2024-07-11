package Utils

import Common.API.PlanContext
import Common.DBAPI.*
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import Models.CardInfo
import cats.effect.IO
import io.circe.generic.auto.*

object CardInfoQueryByFatherUtils {
  def cardInfoQueryByFather(fatherId: Int)(using planContext: PlanContext): IO[List[CardInfo]] = {
    val query = readDBRows(
      s"""SELECT id, fatherid, name
         |FROM "${schemaName}"."${tableName}"
         |WHERE fatherid = ?
             """.stripMargin,
      List(SqlParameter("Int", fatherId.toString))
    )
    query.map { rows =>
      rows.map { row =>
        val id = row.hcursor.get[Int]("id").getOrElse(throw new Exception("Cannot fetch id"))
        val fatherId = row.hcursor.get[Int]("fatherid").getOrElse(throw new Exception("Cannot fetch fatherid"))
        val name = row.hcursor.get[String]("name").getOrElse(throw new Exception("Cannot fetch name"))
        CardInfo(id, fatherId, name)
      }
    }
  }
}