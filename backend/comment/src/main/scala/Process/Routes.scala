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
      case "CommentCreateMessage" =>
        IO(decode[CommentCreateMessagePlanner](str).getOrElse(throw new Exception("Invalid JSON for CommentCreateMessage")))
          .flatMap{m=>
            m.fullPlan.map(_.asJson.toString)
          }
      case "CommentTestMessage" =>
        IO(decode[CommentTestMessagePlanner](str).getOrElse(throw new Exception("Invalid JSON for CommentTestMessage")))
          .flatMap{m=>
            m.fullPlan.map(_.asJson.toString)
          }
      case "CommentDeleteMessage" =>
        IO(decode[CommentDeleteMessagePlanner](str).getOrElse(throw new Exception("Invalid JSON for CommentDeleteMessage")))
          .flatMap{m=>
            m.fullPlan.map(_.asJson.toString)
          }
      case "CommentQueryMessage" =>
        IO(decode[CommentQueryMessagePlanner](str).getOrElse(throw new Exception("Invalid JSON for CommentQueryMessage")))
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
