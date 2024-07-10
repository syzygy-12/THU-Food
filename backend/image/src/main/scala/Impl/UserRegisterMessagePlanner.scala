package Impl

import cats.effect.IO
import io.circe.generic.auto.*
import Common.API.{PlanContext, Planner}
import Common.DBAPI.*
import Common.Object.SqlParameter
import Common.ServiceUtils.schemaName

case class UserRegisterMessagePlanner(userName: String, password: String, authority: Int, override val planContext: PlanContext) extends Planner[Int]:
  override def plan(using planContext: PlanContext): IO[Int] = {
    // Check if the user is already registered
    val checkUserExists = readDBBoolean(s"SELECT EXISTS(SELECT 1 FROM \"${schemaName}\".user_info WHERE username = ?)",
      List(SqlParameter("String", userName))
    )

    println("UserRegisterMessagePlanner: checkUserExists: " + checkUserExists)

    val query = s"INSERT INTO \"${schemaName}\".user_info (username, password, authority) VALUES (?, ?, ?) RETURNING id"
    val parameters = List(
      SqlParameter("String", userName),
      SqlParameter("String", password),
      SqlParameter("Int", authority.toString)
    )

    checkUserExists.flatMap { exists =>
      if (exists) {
        IO.raiseError(new Exception("already registered"))
      } else {
        readDBRows(query, parameters).flatMap {
          case head :: _ =>
            IO(head.hcursor.get[Int]("id").getOrElse(throw new Exception("Cannot fetch ID")))
          case _ =>
            IO.raiseError(new Exception("Insert operation failed"))
        }
      }
    }
  }
