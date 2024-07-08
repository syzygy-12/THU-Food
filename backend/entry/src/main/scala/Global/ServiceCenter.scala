package Global

object ServiceCenter {
  val projectName: String = "APP"

  val dbManagerServiceCode = "A000001"
  val portalServiceCode    = "A000004"
  val entryServiceCode     = "A000006"

  val fullNameMap: Map[String, String] = Map(
    dbManagerServiceCode ->  "数据库管理（DB_Manager）",
    portalServiceCode    ->  "门户（Portal）",
    entryServiceCode     ->  "条目（Entry）"
  )

  val address: Map[String, String] = Map(
    "DB-Manager" ->     "127.0.0.1:10001",
    "Portal" ->         "127.0.0.1:10004",
    "Entry" ->          "127.0.0.1:10006",
  )
}
