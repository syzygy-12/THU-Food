package Global

import Global.GlobalVariables.serviceCode
import cats.effect.IO
import com.comcast.ip4s.Port
import org.http4s.Uri


object ServiceCenter {
  val projectName: String = "APP"

  val dbManagerServiceCode = "A000001"
  val userServiceCode      = "A000002"
  val commentServiceCode   = "A000003"
  val portalServiceCode    = "A000004"
  val entryServiceCode     = "A000006"

  val fullNameMap: Map[String, String] = Map(
    dbManagerServiceCode ->  "数据库管理（DB_Manager）",
    userServiceCode      ->  "用户（User）",
    commentServiceCode   ->  "评论（Comment）",
    portalServiceCode    ->  "门户（Portal）" ,
    entryServiceCode     ->  "条目（Entry）"
  )

  val address: Map[String, String] = Map(
    "DB-Manager" ->     "127.0.0.1:10001",
    "User" ->           "127.0.0.1:10002",
    "Comment" ->        "127.0.0.1:10003",
    "Portal" ->         "127.0.0.1:10004",
    "Entry" ->          "127.0.0.1:10006"
  )

  def getURI(serviceCode: String): IO[Uri] =
    IO.fromEither(Uri.fromString(
      "http://localhost:" + getPort(serviceCode).value.toString + "/"
    ))

  def getPort(serviceCode: String): Port =
    Port.fromInt(portMap(serviceCode)).getOrElse(
      throw new IllegalArgumentException(s"Invalid port for serviceCode: $serviceCode")
    )


  def serviceName(serviceCode: String): String = {
    val fullName = fullNameMap(serviceCode)
    val start = fullName.indexOf("（")
    val end = fullName.indexOf("）")
    fullNameMap(serviceCode).substring(start + 1, end).toLowerCase
  }

  def portMap(serviceCode: String): Int = {
    serviceCode.drop(1).toInt +
      (if (serviceCode.head == 'A') 10000 else if (serviceCode.head == 'D') 20000 else 30000)
  }

  lazy val servicePort: Int = portMap(serviceCode)
  lazy val serviceFullName: String = fullNameMap(serviceCode)
  lazy val serviceShortName: String = serviceName(serviceCode)
  lazy val schemaName: String = serviceName(serviceCode)
}
