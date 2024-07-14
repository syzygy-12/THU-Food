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

object ArticleQueryUtils {
  def articleQuery(id: Int)(using planContext: PlanContext): IO[String] = {
    val query = readDBRows(
      s"SELECT article FROM ${schemaName}.${tableName} WHERE id = ?",
      List(SqlParameter("Int", id.toString))
    )
    query.flatMap {
      case head :: _ =>
        IO(head.hcursor.get[String]("article").getOrElse(""))
      case Nil => IO.raiseError(new Exception("Cannot fetch article"))
    }
  }
}