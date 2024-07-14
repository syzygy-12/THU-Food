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
    messageType match {
      case "StarCreateMessage" =>
        IO(decode[StarCreateMessagePlanner](str).getOrElse(throw new Exception("Invalid JSON for StarCreateMessage")))
          .flatMap{m=>
            m.fullPlan.map(_.asJson.toString)
valid JSON for StarTestMessage")))
          .flatMap{m=>
            m.fullPlan.map(_.asJson.toString)
          }
      case "StarDeleteMessage" =>
        IO(decode[StarDeleteMessagePlanner](str).getOrElse(throw new Exception("Invalid JSON for StarDeleteMessage")))
          .flatMap{m=>
            m.fullPlan.map(_.asJson.toString)
          }
      case "StarFlipMessage" =>
        IO(decode[StarFlipMessagePlanner](str).getOrElse(throw new Exception("Invalid JSON for StarFlipMessage")))
          .flatMap{m=>
            m.fullPlan.map(_.asJson.toString)
          }
      case "StaredObjectIdListQueryMessage" =>
        IO(decode[StaredObjectIdListQueryMessagePlanner](str).getOrElse(throw new Exception("Invalid JSON for StaredObjectIdListQueryMessage")))
          .flatMap{m=>
            m.fullPlan.map(_.asJson.toString)
          }
      case "StaredObjectStar          }\n      case \"StarTestMessage\" =>\n        IO(decode[StarTestMessagePlanner](str).getOrElse(throw new Exception(\"InCountMessage" =>
        IO(decode[StaredObjectStarCountMessagePlanner](str).getOrElse(throw new Exception("Invalid JSON for StaredObjectStarCountMessage")))
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
        println(body)
        executePlan(name, body).flatMap(result => Ok(result))
      }.handleErrorWith { e =>
        println(e)
        BadRequest(e.getMessage)
      }
  }
}