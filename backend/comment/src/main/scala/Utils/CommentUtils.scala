package Utils

import Common.API.{PlanContext, Planner}
import Common.DBAPI.{readDBBoolean, readDBRows, readDBString, writeDB}
import Common.Object.SqlParameter
import Common.ServiceUtils.schemaName
import cats.effect.IO
import io.circe.Json
import io.circe.generic.auto.*
import io.circe.parser.decode
import io.circe.syntax.*
import Models.Comment

import scala.util.Random

object CommentUtils {

  def stringToComment(jsonString: String): IO[Comment] = {
    decode[Comment](jsonString) match {
      case Right(comment) => IO.pure(comment)
      case Left(error) => IO.raiseError(new Exception(s"Failed to decode JSON string: $error"))
    }
  }

  def jsonToComment(json: Json): IO[Comment] = {
    stringToComment(json.noSpaces)
  }

  def commentToJson(comment: Comment): Json = {
    comment.asJson
  }

  def commentToString(comment: Comment): String = {
    commentToJson(comment).noSpaces
  }
}