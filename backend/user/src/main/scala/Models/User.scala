package Models

case class UserLoginResponse(valid: Boolean, id: Option[Int] = None)

// 用 .asJson 转化为 JSON
// 用 decode[Type](JsonString) 转化为 Type