package APIs.UserAPI

case class TokenAuthorityQueryMessage(token: String) extends UserMessage[Int]
