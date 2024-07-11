package Global

object ServiceCenter {
  val projectName: String = "APP"

  val dbManagerServiceCode = "A000001"
  val commentServiceCode = "A000003"
  val portalServiceCode = "A000004"
  val starServiceCode = "A000005"

  val fullNameMap: Map[String, String] = Map(
    dbManagerServiceCode -> "数据库管理（DB_Manager）",
    commentServiceCode -> "评论（Comment）",
    portalServiceCode -> "门户（Portal）",
    starServiceCode -> "收藏（Star）"
  )

  val address: Map[String, String] = Map(
    "DB-Manager" -> "127.0.0.1:10001",
    "Comment" -> "127.0.0.1:10003",
    "Portal" -> "127.0.0.1:10004",
    "Star" -> "127.0.0.1:10005",
  )
}
