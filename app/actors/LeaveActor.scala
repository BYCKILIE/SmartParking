package actors

import java.io.ByteArrayInputStream
import java.util.zip.GZIPInputStream
import java.util.Base64

import org.apache.pekko.actor._
import utils.LicensePlate

object LeaveActor {
  def props(out: ActorRef): Props = Props(new LeaveActor(out))
}

class LeaveActor(out: ActorRef) extends Actor {
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
            "{\"status\": \"accepted\"}"
          else {
            "{\"status\": \"denied\"}"
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
