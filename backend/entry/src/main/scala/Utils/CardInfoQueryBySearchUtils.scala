package Utils

import Common.API.PlanContext
import Common.DBAPI.*
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import Models.CardInfo
import Models.sql.CardInfoSELECTsql
import cats.effect.IO
import cats.implicits.*
import io.circe.generic.auto.*
import io.circe.parser.decode

object CardInfoQueryBySearchUtils {
  def cardInfoQueryBySearch(word: String)(using planContext: PlanContext): IO[List[CardInfo]] = {
    val query = readDBRows(
      CardInfoSELECTsql + "WHERE name LIKE ?",
      List(SqlParameter("String", "%" + word + "%"))
    )
    query.flatMap { rows =>
      val cardInfos = rows.map { json =>
        decode[CardInfo](json.noSpaces) match {
          case Right(cardInfo) => IO.pure(cardInfo)
          case Left(error) => IO.raiseError[CardInfo](new Exception(s"Cannot decode cardInfo: $error"))
        }
      }
      cardInfos.sequence
    }
  }
}