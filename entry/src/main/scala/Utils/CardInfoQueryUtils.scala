package Utils

import Common.API.PlanContext
import Common.DBAPI.*
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import Models.CardInfo
import Models.sql.CardInfoSELECTsql
import cats.effect.IO
import io.circe.generic.auto.*
import io.circe.parser.*

object CardInfoQueryUtils {
  def cardInfoQuery(id: Int)(using planContext: PlanContext): IO[CardInfo] = {
    val query = readDBRows(
      CardInfoSELECTsql + "WHERE id = ?",
      List(SqlParameter("Int", id.toString))
    )
    query.flatMap {
      case head :: _ =>
        decode[CardInfo](head.noSpaces) match {
          case Right(cardInfo) => IO.pure(cardInfo)
          case Left(error) => IO.raiseError(new Exception(s"Cannot decode cardInfo: $error"))
        }
      case Nil => IO.raiseError(new Exception("Cannot fetch cardInfo"))
    }
  }
}