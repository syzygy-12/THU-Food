package Process

import Common.API.PlanContext
import Impl.{EntryCreateMessagePlanner, *}
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
      case "EntryCreateMessage" =>
        IO(decode[EntryCreateMessagePlanner](str).getOrElse(throw new Exception("Invalid JSON for EntryCreateMessage")))
          .flatMap{m=>
            m.fullPlan.map(_.asJson.toString)
          }
      case "EntryTestMessage" =>
        IO(decode[EntryTestMessagePlanner](str).getOrElse(throw new Exception("Invalid JSON for EntryTestMessage")))
          .flatMap{m=>
            m.fullPlan.map(_.asJson.toString)
          }
      case "EntryDeleteMessage" =>
        IO(decode[EntryDeleteMessagePlanner](str).getOrElse(throw new Exception("Invalid JSON for EntryDeleteMessage")))
          .flatMap{m=>
            m.fullPlan.map(_.asJson.toString)
          }
      case "CardInfoQueryMessage" =>
        IO(decode[CardInfoQueryMessagePlanner](str).getOrElse(throw new Exception("Invalid JSON for CardInfoQueryMessage")))
          .flatMap{m=>
            m.fullPlan.map(_.asJson.toString)
          }
      case "CardInfoQueryByFatherMessage" =>
        IO(decode[CardInfoQueryByFatherMessagePlanner](str).getOrElse(throw new Exception("Invalid JSON for CardInfoQueryByFatherMessage")))
          .flatMap{m=>
            m.fullPlan.map(_.asJson.toString)
          }
      case "CardInfoQueryByGrandfatherMessage" =>
        IO(decode[CardInfoQueryByGrandfatherMessagePlanner](str).getOrElse(throw new Exception("Invalid JSON for CardInfoQueryByGrandfatherMessage")))
          .flatMap{m=>
            m.fullPlan.map(_.asJson.toString)
          }
      case "CardInfoQueryByIdListMessage" =>
        IO(decode[CardInfoQueryByIdListMessagePlanner](str).getOrElse(throw new Exception("Invalid JSON for CardInfoQueryByIdListMessage")))
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