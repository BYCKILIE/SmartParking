package services

import javax.inject.Inject

import scala.concurrent.ExecutionContext
import scala.concurrent.Future

import org.mongodb.scala.model.Filters._
import org.mongodb.scala.model.Updates._
import org.mongodb.scala.Document
import org.mongodb.scala.MongoCollection
import repositories.BookingsRepository
import utils.Mongo
import DTO.BookingsDTO

class BookingsService @Inject() (implicit ex: ExecutionContext) extends BookingsRepository {

  private val collection: MongoCollection[Document] = Mongo.database.getCollection("bookings")

  override def createBooking(booking: BookingsDTO): Future[Boolean] = {
    val document = Document(
      "user_id"   -> booking.user_id,
      "license"   -> booking.license,
      "arrival"   -> booking.arrival,
      "departure" -> booking.departure
    )
    collection.insertOne(document).toFuture().map { result =>
      result.wasAcknowledged()
    }
  }

  override def readBooking(license: String): Future[BookingsDTO] = {
    collection.find(equal("license", license)).headOption().flatMap { maybeDocument =>
      maybeDocument
        .map { document =>
          val user_id   = document.getLong("user_id")
          val license   = document.getString("license")
          val arrival   = document.getString("arrival")
          val departure = document.getString("departure")

          Future.successful(BookingsDTO(user_id, license, arrival, departure))
        }
        .getOrElse(Future.failed(new NoSuchElementException(s"No booking found for license $license")))
    }
  }

  override def updateBooking(booking: BookingsDTO): Future[Boolean] = {
    val filter = and(
      equal("license", booking.license)
    )

    val update = combine(
      set("arrival", booking.arrival),
      set("departure", booking.departure)
    )

    collection.updateOne(filter, update).toFuture().map { result =>
      result.wasAcknowledged() && result.getModifiedCount > 0
    }
  }

  override def deleteBooking(booking: BookingsDTO): Future[Boolean] = {
    val filter = and(
      equal("license", booking.license),
      equal("arrival", booking.arrival),
      equal("departure", booking.departure)
    )

    collection.deleteOne(filter).toFuture().map { result =>
      result.wasAcknowledged() && result.getDeletedCount > 0
    }
  }
}
