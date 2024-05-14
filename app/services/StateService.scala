package services

import scala.concurrent.{ExecutionContext, Future}
import javax.inject.Inject
import org.mongodb.scala.model.Filters._
import org.mongodb.scala.model.Updates._
import org.mongodb.scala.Document
import org.mongodb.scala.MongoCollection
import utils.Mongo
import DTO.StateDTO
import repositories.StateRepository

import scala.collection.mutable.ListBuffer

class StateService @Inject() (implicit ex: ExecutionContext) extends StateRepository {

  private val collection: MongoCollection[Document] = Mongo.database.getCollection("state")

  override def readFullState(): Future[List[StateDTO]] = {
    val resultBuffer = ListBuffer[StateDTO]()
    collection.find().toFuture().map { documents =>
      for (document <- documents) {
        val slot_id = document.getLong("slot_id")
        val occupied = document.getBoolean("occupied")
        resultBuffer += StateDTO(slot_id = slot_id, occupied = occupied)
      }
      resultBuffer.toList
    }
  }

  override def updateState(state: StateDTO): Future[Boolean] = {
    val filter = and(
      equal("slot_id", state.slot_id)
    )
    val update = combine(
      set("occupied", state.occupied),
    )
    collection.updateOne(filter, update).toFuture().map { result =>
      result.wasAcknowledged() && result.getModifiedCount > 0
    }
  }
}
