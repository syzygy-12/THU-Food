package Common.Object

import io.circe._

class Node (val _Name: String, val _SonIdList: List[Int]) {
  var Name: String = _Name
  var SonIdList: List[Int] = _SonIdList
  var isDeleted: Boolean = false
  var isShown: Boolean = false
}

class User (val _Name: String, val _Password: String) {
  var Name: String = _Name
  var Password: String = _Password
}

// 用 .asJson 转化为 JSON
// 用 decode[Type](JsonString) 转化为 Type