package APIs.CommentAPI

case class CommentLikesIncrementMessage(id: Int, delta: Int) extends CommentMessage[Boolean]
