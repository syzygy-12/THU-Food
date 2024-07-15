package Utils

import Common.API.PlanContext
import Common.DBAPI.*
import Common.Object.SqlParameter
import Common.ServiceUtils.schemaName
import cats.effect.IO
import io.circe.generic.auto.deriveEncoder

object TokenUserIdQueryUtils {
  def queryTokenUserId(token: String)(using planContext: PlanContext) : IO[Int] = {
    val query = s"SELECT authority FROM ${schemaName}.token WHERE token = ?"
    val parameters = List(SqlParameter("String", token))

    readDBRows(query, parameters).flatMap {
      case head :: _ =>
        IO(head.hcursor.get[Int]("authority").getOrElse(throw new Exception("Cannot fetch authority")))
      case _ => IO(0)
    }
  }
}