package Models

import Models.NodeInit.newNode

case class Entry(id: Int, node: Node, name: String, commentIdList: Array[Int] = Array.empty[Int])

object EntryInit {
  def newEntry(): Entry = {
    Entry(0, newNode(), "new", Array.empty[Int])
  }
}

// 用 .asJson 转化为 JSON
// 用 decode[Type](JsonString) 转化为 Type