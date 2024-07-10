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
      case "NodeQueryMessage" =>
        IO(decode[NodeQueryMessagePlanner](str).getOrElse(throw new Exception("Invalid JSON for NodeQueryMessage")))
          .flatMap{m=>
            m.fullPlan.map(_.asJson.toString)
          }
      case "NodeModifyMessage" =>
        IO(decode[NodeModifyMessagePlanner](str).getOrElse(throw new Exception("Invalid JSON for NodeModifyMessage")))
          .flatMap{m=>
            m.fullPlan.map(_.asJson.toString)
          }
      case "NameQueryMessage" =>
        IO(decode[NameQueryMessagePlanner](str).getOrElse(throw new Exception("Invalid JSON for NameQueryMessage")))
          .flatMap{m=>
            m.fullPlan.map(_.asJson.toString)
          }
      case "CommentIdListQueryMessage" =>
        IO(decode[CommentIdListQueryMessagePlanner](str).getOrElse(throw new Exception("Invalid JSON for CommentIdListQueryMessage")))
          .flatMap{m=>
            m.fullPlan.map(_.asJson.toString)
          }
      case "CommentIdInsertMessage" =>
        IO(decode[CommentIdInsertMessagePlanner](str).getOrElse(throw new Exception("Invalid JSON for CommentIdInsertMessage")))
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