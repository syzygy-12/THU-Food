package Models

case class CardInfo(
  id: Int,
  fatherId: Int,
  name: String,
  stars: Int,
  scoreHistogram: Array[Int]
)