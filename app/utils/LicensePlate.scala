package utils
import java.io.{File, FileOutputStream}
import scala.sys.process._

object LicensePlate {
  def recognize(bytes: Array[Byte]): String = {
    val tempFile = createImage(bytes)
    val plate = runProcess(tempFile.getPath)
    tempFile.delete()
    plate
  }

  private def createImage(bytes: Array[Byte]): File = {
    val tempFile = File.createTempFile("image", ".jpg")
    val outputStream = new FileOutputStream(tempFile)
    outputStream.write(bytes)
    outputStream.close()
    tempFile
  }

  private def runProcess(path: String): String = {
    val command = s"openalpr_64\\alpr.exe $path -c eu -n 1"
    val pattern = "(?<=- ).*?(?=\\s+confidence)".r
    pattern.findFirstIn(command.!!).getOrElse("")
  }
}
