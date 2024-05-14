package repositories

import scala.concurrent.Future

import DTO.StateDTO

trait StateRepository {
  def readFullState(): Future[List[StateDTO]]

  def updateState(state: StateDTO): Future[Boolean]
}
