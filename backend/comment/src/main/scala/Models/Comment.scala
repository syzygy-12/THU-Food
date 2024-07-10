package Models


case class Comment(
  id: Int,
  content: String,
  userId: Int,
  entryId: Int
)

// 用 .asJson 转化为 JSON
// 用 decode[Type](JsonString) 转化为 Type