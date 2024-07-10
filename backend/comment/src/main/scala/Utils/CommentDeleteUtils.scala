package Utils

import Common.API.PlanContext
import Common.DBAPI.{ReadDBRowsMessage, readDBRows, writeDB}
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import Models.CommentInit
import cats.effect.IO
import io.circe.Json
import io.circe.generic.auto.*
import io.circe.syntax.*

object CommentDeleteUtils {

  def commentDelete(id: Int)(using planContext: PlanContext): IO[String] = {
      
      val query = s"DELETE FROM ${schemaName}.${tableName} WHERE id = ?"
      val parameters = List(
        SqlParameter("Int", id.toString)
      )
  
      writeDB(query, parameters)
  }
}
