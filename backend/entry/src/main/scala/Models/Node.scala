package Models

case class Node(fatherId: Int, son: List[Int])

object NodeInit {
  def newNode(): Node = {
    new Node(0, List())
  }
}

// 用 .asJson 转化为 JSON
// 用 decode[Type](JsonString) 转化为 Type