package Utils

import Common.API.PlanContext
import Common.DBAPI.*
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import Models.CardInfo
import cats.effect.IO
import io.circe.generic.auto.*

object CardInfoQueryUtils {
  def cardInfoQuery(id: Int)(using planContext: PlanContext): IO[CardInfo] = {
    val query = readDBRows(
      s"""SELECT id, fatherid, name, stars, scorehistogram
         |FROM "${schemaName}"."${tableName}"
         |WHERE id = ?
         """.stripMargin,
      List(SqlParameter("Int", id.toString))
    )
    query.flatMap  {
      case head :: _ =>
        val id = head.hcursor.get[Int]("id").getOrElse(throw new Exception("Cannot fetch id"))
        val fatherId = head.hcursor.get[Int]("fatherid").getOrElse(throw new Exception("Cannot fetch fatherid"))
        val name = head.hcursor.get[String]("name").getOrElse(throw new Exception("Cannot fetch name"))
        val stars = head.hcursor.get[Int]("stars").getOrElse(throw new Exception("Cannot fetch stars"))
        val scoreHistogram = head.hcursor.get[Array[Int]]("scorehistogram").getOrElse(throw new Exception("Cannot fetch scorehistogram"))
        IO(CardInfo(id, fatherId, name, stars, scoreHistogram))
      case Nil => IO.raiseError(new Exception("Cannot fetch cardInfo"))
    }
  }
}