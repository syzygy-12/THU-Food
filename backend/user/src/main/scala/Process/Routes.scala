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
      case "UserLoginMessage" =>
        IO(decode[UserLoginMessagePlanner](str).getOrElse(throw new Exception("Invalid JSON for UserLoginMessage")))
          .flatMap{m=>
            m.fullPlan.map(_.asJson.toString)
          }
      case "UserRegisterMessage" =>
        IO(decode[UserRegisterMessagePlanner](str).getOrElse(throw new Exception("Invalid JSON for UserRegisterMessage")))
          .flatMap{m=>
            m.fullPlan.map(_.asJson.toString)
          }
      case "UserPasswordChangeMessage" =>
        IO(decode[UserPasswordChangeMessagePlanner](str).getOrElse(throw new Exception("Invalid JSON for UserPasswordChangeMessage")))
          .flatMap{m=>
            m.fullPlan.map(_.asJson.toString)
          }
      case "UserAuthorityChangeMessage" =>
        IO(decode[UserAuthorityChangeMessagePlanner](str).getOrElse(throw new Exception("Invalid JSON for UserAuthorityChangeMessage")))
          .flatMap{m=>
            m.fullPlan.map(_.asJson.toString)
          }
      case "UserInfoQueryMessage" =>
        IO(decode[UserInfoQueryMessagePlanner](str).getOrElse(throw new Exception("Invalid JSON for UserInfoQueryMessage")))
          .flatMap{m=>
            m.fullPlan.map(_.asJson.toString)
          }
      case "UserInfoQueryByIdListMessage" =>
        IO(decode[UserInfoQueryByIdListMessagePlanner](str).getOrElse(throw new Exception("Invalid JSON for UserInfoQueryByIdListMessage")))
          .flatMap{m=>
            m.fullPlan.map(_.asJson.toString)
          }
      case "UserAvatarChangeMessage" =>
        IO(decode[UserAvatarChangeMessagePlanner](str).getOrElse(throw new Exception("Invalid JSON for UserAvatarChangeMessage")))
          .flatMap{m=>
            m.fullPlan.map(_.asJson.toString)
          }
      case "UserNicknameChangeMessage" =>
        IO(decode[UserNicknameChangeMessagePlanner](str).getOrElse(throw new Exception("Invalid JSON for UserNicknameChangeMessage")))
          .flatMap{m=>
            m.fullPlan.map(_.asJson.toString)
          }
      case "TokenDeleteMessage" =>
        IO(decode[TokenDeleteMessagePlanner](str).getOrElse(throw new Exception("Invalid JSON for TokenDeleteMessage")))
          .flatMap{m=>
            m.fullPlan.map(_.asJson.toString)
          }
      case "TokenUserIdQueryMessage" =>
        IO(decode[TokenUserIdQueryMessagePlanner](str).getOrElse(throw new Exception("Invalid JSON for TokenUserIdQueryMessage")))
          .flatMap{m=>
            m.fullPlan.map(_.asJson.toString)
          }
      case "TokenAuthorityQueryMessage" =>
        IO(decode[TokenAuthorityQueryMessagePlanner](str).getOrElse(throw new Exception("Invalid JSON for TokenAuthorityQueryMessage")))
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
