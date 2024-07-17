package APIs.EntryAPI

case class EntryStarsIncrementMessage(id: Int, delta: Int) extends EntryMessage[Boolean]
