package actors

import java.io.ByteArrayInputStream
import java.util.zip.GZIPInputStream
import java.util.Base64

import scala.concurrent.duration.DurationDouble
import scala.concurrent.duration.DurationInt

import org.apache.pekko.actor._
import utils.LicensePlate

object WebSocketActor {
  def props(out: ActorRef): Props = Props(new WebSocketActor(out))
}

class WebSocketActor(out: ActorRef) extends Actor {
  private val buffer = new StringBuilder("")

  override def receive: Receive = {
    case msg: String =>
      val license = {
        if (msg.startsWith("skip")) {
          "skipped"
        } else if (msg == "ready") {
          val license_util = LicensePlate.recognize(buildFrame())
          buffer.clear()
          if (license_util == "CT08BGG")
            "{\"status\": \"accepted\", \"slot\": \"L01\"}"
          else {
            "{\"status\": \"denied\", \"slot\": \"L00\"}"
          }
        } else {
          buffer.append(msg)
          "acknowledged"
        }
      }
      out ! license
  }

  private def buildFrame(): Array[Byte] = {
    new GZIPInputStream(
      new ByteArrayInputStream(
        Base64.getDecoder.decode(buffer.toString())
      )
    ).readAllBytes()
  }
}
