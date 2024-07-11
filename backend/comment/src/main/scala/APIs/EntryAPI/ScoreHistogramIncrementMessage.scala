package APIs.EntryAPI

case class ScoreHistogramIncrementMessage(id: Int, score: Int, delta: Int) extends EntryMessage[Boolean]
