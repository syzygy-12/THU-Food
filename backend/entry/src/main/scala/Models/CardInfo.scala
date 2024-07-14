package Models

import Common.ServiceUtils.{schemaName, tableName}
import io.circe.Decoder
import io.circe.generic.semiauto.deriveDecoder

case class CardInfo(
  id: Int,
  fatherID: Int,
  name: String,
  stars: Int,
  scoreHistogram: Array[Int],
  isHidden : Boolean,
  isNew: Boolean,
  isFood : Boolean,
  image : String
)

object CardInfo {
  implicit val decoder: Decoder[CardInfo] = deriveDecoder[CardInfo]
}

object sql:
  lazy val CardInfoSELECTsql: String = s"SELECT id, father_id, name, stars, score_histogram, is_hidden, is_new, is_food, image FROM ${schemaName}.${tableName} "