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
import Models.Node

import scala.util.Random

object NodeUtils {

  def stringToNode(jsonString: String): IO[Node] = {
    decode[Node](jsonString) match {
      case Right(node) => IO.pure(node)
      case Left(error) => IO.raiseError(new Exception(s"Failed to decode JSON string: $error"))
    }
  }
  
  def jsonToNode(json: Json): IO[Node] = {
    stringToNode(json.noSpaces)
  }
  
  def nodeToJson(node: Node): Json = {
    node.asJson
  }

  def nodeToString(node: Node): String = {
    nodeToJson(node).noSpaces
  }
}