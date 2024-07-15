package Models

import io.circe.Decoder
import io.circe.generic.semiauto.deriveDecoder

case class UserLoginResponse(
  valid: Boolean,
  id: Option[Int] = None,
  token: Option[String] = None
)

case class UserInfo(
  nickname: String,
  avatar: String,
  authority: Int
)

object UserInfo {
  implicit val decoder: Decoder[UserInfo] = deriveDecoder[UserInfo]
}