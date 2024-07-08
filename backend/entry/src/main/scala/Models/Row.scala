package Models

import Models.NodeInit.newNode

case class Entry(id: Int, node: Node, name: String)

object EntryInit {
  def newEntry(): Entry = {
    new Entry(0, newNode(), "new")
  }
}

// 用 .asJson 转化为 JSON
// 用 decode[Type](JsonString) 转化为 Type