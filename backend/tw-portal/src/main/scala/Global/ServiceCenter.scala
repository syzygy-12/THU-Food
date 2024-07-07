package Global

import Global.GlobalVariables.serviceCode
import cats.effect.IO
import com.comcast.ip4s.Port
import org.http4s.Uri

object ServiceCenter {
  val projectName: String = "APP"

  val dbManagerServiceCode = "A000001"
  val doctorServiceCode = "A000002"
  val patientServiceCode = "A000003"
  val portalServiceCode = "A000004"
  val nodeServiceCode = "A000005"
  val entryServiceCode = "A000006"

  val fullNameMap: Map[String, String] = Map(
    dbManagerServiceCode -> "数据库管理（DB_Manager）",
    doctorServiceCode -> "医生（Doctor）",
    patientServiceCode -> "病人（Patient）",
    portalServiceCode -> "门户（Portal）",
    nodeServiceCode -> "节点（Node）",
    entryServiceCode -> "条目（Entry）"
  )

  val address: Map[String, String] = Map(
    "DB-Manager" -> "127.0.0.1:10001",
    "Doctor" -> "127.0.0.1:10002",
    "Patient" -> "127.0.0.1:10003",
    "Portal" -> "127.0.0.1:10004",
    "Node" -> "127.0.0.1:10005",
    "Entry" -> "127.0.0.1:10006"
  )
}
