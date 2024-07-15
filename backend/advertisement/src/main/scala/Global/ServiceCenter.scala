package Global

import Global.GlobalVariables.serviceCode
import cats.effect.IO
import com.comcast.ip4s.Port
import org.http4s.Uri

object ServiceCenter {
  val projectName: String = "APP"
  val dbManagerServiceCode      = "A000001"
  val portalServiceCode         = "A000004"
  val advertisementServiceCode  = "A000007"

  val fullNameMap: Map[String, String] = Map(
    dbManagerServiceCode         ->  "数据库管理（DB_Manager）",
    portalServiceCode            ->  "门户（Portal）",
    advertisementServiceCode     ->  "广告（Advertisement）"
  )

  val address: Map[String, String] = Map(
    "DB-Manager" ->     "127.0.0.1:10001",
    "Portal" ->         "127.0.0.1:10004",
    "Advertisement" ->  "127.0.0.1:10007",
  )
}
