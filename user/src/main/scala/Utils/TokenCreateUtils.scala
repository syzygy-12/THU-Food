package Utils

import Common.API.PlanContext
import Common.DBAPI.*
import Common.Object.SqlParameter
import Common.ServiceUtils.schemaName
import cats.effect.IO
import io.circe.generic.auto.deriveEncoder
import java.util.Base64
import scala.util.Random

def generateRandomBase64String(length: Int): String = {
  val randomBytes = new Array[Byte]((length * 3) / 4) // Base64 encoding inflates size by 4/3
  Random.nextBytes(randomBytes)
  val base64String = Base64.getEncoder.encodeToString(randomBytes)
  base64String.substring(0, length)
}

object TokenCreateUtils {
  def createToken(userId: Int, authority: Int)(using planContext: PlanContext) : IO[String] = {
    val newToken = generateRandomBase64String(16)
    val query = s"INSERT INTO \"${schemaName}\".token (token, userid, authority) VALUES (?, ?, ?)"
    val parameters = List(
      SqlParameter("String", newToken),
      SqlParameter("Int", userId.toString),
      SqlParameter("Int", authority.toString)
    )
    writeDB(query, parameters).map(_ => newToken)
  }
}