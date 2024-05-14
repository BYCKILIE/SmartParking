package repositories

import scala.concurrent.Future

import DTO.BookingsDTO

trait BookingsRepository {
  def createBooking(booking: BookingsDTO): Future[Boolean]

  def readBooking(license: String): Future[BookingsDTO]

  def updateBooking(booking: BookingsDTO): Future[Boolean]

  def deleteBooking(booking: BookingsDTO): Future[Boolean]
}
