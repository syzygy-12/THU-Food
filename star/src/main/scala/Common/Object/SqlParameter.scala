package Common.Object

import io.circe.generic.semiauto.deriveEncoder
import io.circe.{Decoder, Encoder, HCursor}

// Define the SqlParameter case class
case class SqlParameter(dataType: String, value: String)

object SqlParameter {
  // Encoder for SqlParameter
  implicit val encodeSqlParameter: Encoder[SqlParameter] = deriveEncoder[SqlParameter]

  // Decoder for SqlParameter
  implicit val decodeSqlParameter: Decoder[SqlParameter] = new Decoder[SqlParameter] {
    final def apply(c: HCursor): Decoder.Result[SqlParameter] = for {
      dataType <- c.downField("dataType").as[String]
      value <- c.downField("value").as[String]
    } yield {
      dataType.toLowerCase match {
        case "string" => SqlParameter("String", value)
        case "int" => SqlParameter("Int", value)
        case "boolean" => SqlParameter("Boolean", value)
        case "datetime" => SqlParameter("DateTime", value)
        case "json" => SqlParameter("Json", value) // Add case for Json
        case "int[]" => SqlParameter("Int[]", value) // Add case for "Array"
        // Add more type cases as needed
        case _ => throw new Exception("Unsupported data type")
      }
    }
  }
}