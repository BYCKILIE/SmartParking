package controllers

import javax.inject._
import scala.concurrent.ExecutionContext
import org.apache.pekko.actor.ActorSystem
import org.apache.pekko.stream.Materializer
import play.api.libs.streams.ActorFlow
import play.api.mvc._
import actors.{WebSocketActor, LeaveActor}
import play.api.mvc.WebSocket.MessageFlowTransformer

@Singleton
class WebSocketController @Inject() (cc: ControllerComponents)(
    implicit system: ActorSystem,
    mat: Materializer,
    ec: ExecutionContext
) extends AbstractController(cc) {

  def socket: WebSocket = WebSocket.accept[String, String] { request =>
    ActorFlow.actorRef { out =>
      WebSocketActor.props(out)
    }
  }

  def leaveSocket: WebSocket = WebSocket.accept[String, String] { request =>
    ActorFlow.actorRef { out =>
      LeaveActor.props(out)
    }
  }
}
