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
}
