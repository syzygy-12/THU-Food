package Utils

import Common.API.{PlanContext}
import Common.DBAPI.{ReadDBRowsMessage, readDBRows}
import Common.Object.SqlParameter
import Common.ServiceUtils.schemaName
import Models.Node
import cats.effect.IO
import io.circe.Json
import io.circe.generic.auto._

object NodeCreateUtils {

  def nodeCreate(node: Node)(using planContext: PlanContext): IO[Int] = {

    val query = s"INSERT INTO ${schemaName}.node_info (\"fatherId\", son, \"entryId\") VALUES (?, CAST(? AS INTEGER[]), ?) RETURNING id"
    val parameters = List(
      SqlParameter("Int", node.fatherId.toString),
      SqlParameter("String", node.son.mkString("{",",","}")),
      SqlParameter("Int", node.entryId.toString)
    )

    readDBRows(query, parameters).flatMap {
      case head :: _ =>
        IO(head.hcursor.get[Int]("id").getOrElse(throw new Exception("Cannot fetch ID")))
      case _ =>
        IO.raiseError(new Exception("Insert operation failed"))
    }
  }
}
