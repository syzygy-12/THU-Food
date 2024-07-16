package APIs.UserAPI

case class TokenUserIdQueryMessage(token: String) extends UserMessage[Int]
