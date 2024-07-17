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


object Routes:
  private def executePlan(messageType:String, str: String): IO[String]=
    messageType match {
      case "AdCreateMessage" =>
        IO(decode[AdCreateMessagePlanner](str).getOrElse(throw new Exception("Invalid JSON for AdCreateMessage")))
          .flatMap{m=>
            m.fullPlan.map(_.asJson.toString)
          }
      case "AdDeleteMessage" =>
        IO(decode[AdDeleteMessagePlanner](str).getOrElse(throw new Exception("Invalid JSON for AdDeleteMessage")))
          .flatMap{m=>
            m.fullPlan.map(_.asJson.toString)
          }
      case "AdModifyMessage" =>
        IO(decode[AdModifyMessagePlanner](str).getOrElse(throw new Exception("Invalid JSON for AdModifyMessage")))
          .flatMap{m=>
            m.fullPlan.map(_.asJson.toString)
          }
      case "AdListQueryMessage" =>
        IO(decode[AdListQueryMessagePlanner](str).getOrElse(throw new Exception("Invalid JSON for AdListQueryMessage")))
          .flatMap{m=>
            m.fullPlan.map(_.asJson.toString)
          }
      case _ =>
        IO.raiseError(new Exception(s"Unknown type: $messageType"))
    }

  val service: HttpRoutes[IO] = HttpRoutes.of[IO]:
    case req @ POST -> Root / "api" / name =>
        println("request received")
        req.as[String].flatMap{executePlan(name, _)}.flatMap(Ok(_))
        .handleErrorWith{e =>
          println(e)
          BadRequest(e.getMessage)
        }
