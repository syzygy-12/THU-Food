package Process

import Common.API.PlanContext
import Impl.*
import cats.effect.*
import io.circe.generic.auto.*
import io.circe.parser.decode
import io.circe.syntax.*
import org.http4s.*
import org.http4s.client.Client
import org.http4s.dsl.io.*


object Routes {
  private def executePlan(messageType: String, str: String): IO[String] =
    println(str)
    println("sdsdsds")
    messageType match {
      case "NodeIdQueryMessage" =>
        IO(decode[NodeIdQueryMessagePlanner](str).getOrElse(throw new Exception("Invalid JSON for NodeIdQueryMessage")))
          .flatMap{m=>
            m.fullPlan.map(_.asJson.toString)
          }
      case "NodeCreateMessage" =>
        IO(decode[NodeCreateMessagePlanner](str).getOrElse(throw new Exception("Invalid JSON for NodeCreateMessage")))
          .flatMap{m=>
            m.fullPlan.map(_.asJson.toString)
          }
      case "NodeModifyMessage" =>
        IO(decode[NodeModifyMessagePlanner](str).getOrElse(throw new Exception("Invalid JSON for NodeModifyMessage")))
          .flatMap{m=>
            m.fullPlan.map(_.asJson.toString)
          }
      case _ =>
        IO.raiseError(new Exception(s"Unknown type: $messageType"))
    }

  val service: HttpRoutes[IO] = HttpRoutes.of[IO] {
    case req@POST -> Root / "api" / name =>
      println("request received")
      req.as[String].flatMap { body =>
        executePlan(name, body).flatMap(result => Ok(result))
      }.handleErrorWith { e =>
        println(e)
        BadRequest(e.getMessage)
      }
  }
}