package Utils

import Common.API.PlanContext
import Common.DBAPI.*
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import Models.CardInfo
import cats.effect.IO
import io.circe.generic.auto.*

object CardInfoQueryByGrandfatherUtils {
  def cardInfoQueryByGrandfather(grandfatherId: Int)(using planContext: PlanContext): IO[List[CardInfo]] = {
    val query = readDBRows(
      s"""SELECT id, fatherid, name, stars, scorehistogram
         |FROM "${schemaName}"."${tableName}"
         |WHERE grandfatherid = ?
         """.stripMargin,
      List(SqlParameter("Int", grandfatherId.toString))
    )
    query.map { rows =>
      rows.map { row =>
        val id = row.hcursor.get[Int]("id").getOrElse(throw new Exception("Cannot fetch id"))
        val fatherId = row.hcursor.get[Int]("fatherid").getOrElse(throw new Exception("Cannot fetch fatherid"))
        val name = row.hcursor.get[String]("name").getOrElse(throw new Exception("Cannot fetch name"))
        val stars = row.hcursor.get[Int]("stars").getOrElse(throw new Exception("Cannot fetch stars"))
        val scoreHistogram = row.hcursor.get[Array[Int]]("scorehistogram").getOrElse(throw new Exception("Cannot fetch scorehistogram"))
        CardInfo(id, fatherId, name, stars, scoreHistogram)
      }
    }
  }
}