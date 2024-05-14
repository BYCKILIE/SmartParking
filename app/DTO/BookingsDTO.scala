package DTO

import io.circe._
import io.circe.generic.semiauto._
import io.circe.syntax.EncoderOps

case class BookingsDTO(user_id: Long, license: String, arrival: String, departure: String)

object BookingsDTO {
  implicit val bookingsDecoder: Decoder[BookingsDTO] = deriveDecoder[BookingsDTO]
  implicit val bookingsEncoder: Encoder[BookingsDTO] = deriveEncoder[BookingsDTO]

  def decode(jsonString: String): BookingsDTO = {
    parser.decode[BookingsDTO](jsonString) match {
      case Left(_) =>
        throw new IllegalArgumentException(s"Invalid JSON object")
      case Right(dtoObject) => dtoObject
    }
  }

  def encode(dtoObject: BookingsDTO): String = {
    dtoObject.asJson.noSpaces
  }
}
