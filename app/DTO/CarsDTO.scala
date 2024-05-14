package DTO

import io.circe._
import io.circe.generic.semiauto._
import io.circe.syntax.EncoderOps

case class CarsDTO(userId: Long, license: Option[String] = None)

object CarsDTO {
  implicit val carsDecoder: Decoder[CarsDTO] = deriveDecoder[CarsDTO]
  implicit val carsEncoder: Encoder[CarsDTO] = deriveEncoder[CarsDTO]

  def decode(jsonString: String): CarsDTO = {
    parser.decode[CarsDTO](jsonString) match {
      case Left(_) =>
        throw new IllegalArgumentException(s"invalid JSON object")
      case Right(dtoObject) => dtoObject
    }
  }

  def encode(dtoObject: CarsDTO): String = {
    dtoObject.asJson.noSpaces
  }
}