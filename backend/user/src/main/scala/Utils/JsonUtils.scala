package Utils

import cats.effect.IO
import io.circe.Json
import io.circe.parser.{decode, parse}

object JsonUtils {
  def extractJsonField(fieldName: String, jsonList: IO[List[Json]]): IO[String] = {
    jsonList.flatMap {
      case head :: _ =>
        val jsonResultStrOpt = head.hcursor.downField(fieldName).as[String].toOption
        jsonResultStrOpt match {
          case Some(jsonStr) => IO.pure(jsonStr)
          case None => IO.raiseError(new Exception("Invalid JSON format"))
        }
      case _ =>
        IO.raiseError(new Exception("Record not found"))
    }
  }
}