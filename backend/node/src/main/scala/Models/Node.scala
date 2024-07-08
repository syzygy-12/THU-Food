package Models

case class Node(id: Int, fatherId: Int, son: List[Int], entryId: Int)

// 用 .asJson 转化为 JSON
// 用 decode[Type](JsonString) 转化为 Type