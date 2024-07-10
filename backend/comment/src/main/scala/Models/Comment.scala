package Models


case class Comment(
  content: String,
  userId: Int,
  entryId: Int
)

object CommentInit {
  def newComment(): Comment = {
    Comment("new comment", 0, 0)
  }
}

// 用 .asJson 转化为 JSON
// 用 decode[Type](JsonString) 转化为 Type