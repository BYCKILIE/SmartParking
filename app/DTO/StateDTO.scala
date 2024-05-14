package DTO

import io.circe._
import io.circe.generic.semiauto._
import io.circe.syntax.EncoderOps

case class StateDTO (slot_id: Long, occupied: Boolean)

object StateDTO {
  implicit val bookingsDecoder: Decoder[StateDTO] = deriveDecoder[StateDTO]
  implicit val bookingsEncoder: Encoder[StateDTO] = deriveEncoder[StateDTO]

  def decode(jsonString: String): StateDTO = {
    parser.decode[StateDTO](jsonString) match {
      case Left(_) =>
        throw new IllegalArgumentException(s"Invalid JSON object")
      case Right(dtoObject) => dtoObject
    }
  }

  def encode(dtoObject: StateDTO): String = {
    dtoObject.asJson.noSpaces
  }
}