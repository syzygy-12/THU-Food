package com.example

import akka.http.scaladsl.server.directives.FileInfo
import akka.stream.scaladsl.{FileIO, Sink, Source}
import akka.util.ByteString
import java.awt.{Color, Graphics2D}
import java.awt.image.BufferedImage
import java.io.{ByteArrayInputStream, ByteArrayOutputStream}
import java.nio.file.{Files, Path, Paths}
import java.util.{Base64, UUID}
import javax.imageio.ImageIO
import scala.concurrent.{ExecutionContext, Future}
import akka.stream.Materializer

class ImageService()(implicit ec: ExecutionContext, mat: Materializer) {
  private val imagesDir: Path = Paths.get("images")

  if (!Files.exists(imagesDir)) {
    Files.createDirectories(imagesDir)
  }

  def saveImage(fileInfo: FileInfo, fileStream: Source[ByteString, Any]): Future[String] = {
    val baseName = generateUniqueFileName()
    val targetFilePathLow = imagesDir.resolve(baseName + "-low.jpg")
    val targetFilePathHigh = imagesDir.resolve(baseName + "-high.jpg")

    fileStream.runWith(Sink.fold(ByteString.empty)(_ ++ _)).flatMap { bytes =>
      val image = readImage(bytes)
      image match {
        case Some(img) =>
          val lowResImage = createResizedCopy(img, img.getWidth / 4, img.getHeight / 4, true)
          val highResImage = createResizedCopy(img, img.getWidth, img.getHeight, true)

          saveAsJpeg(lowResImage, targetFilePathLow)
          saveAsJpeg(highResImage, targetFilePathHigh)

          Future.successful(baseName)
        case None => Future.failed(new IllegalArgumentException("Invalid image format"))
      }
    }
  }

  private def readImage(bytes: ByteString): Option[BufferedImage] = {
    val byteArray = bytes.toArray
    val inputStream = new ByteArrayInputStream(byteArray)
    val image = ImageIO.read(inputStream)
    if (image == null) {
      None
    } else {
      Some(image)
    }
  }

  private def generateUniqueFileName(): String = {
    val uuid = UUID.randomUUID().toString
    val encoder = Base64.getUrlEncoder.withoutPadding()
    encoder.encodeToString(uuid.getBytes)
  }

  private def createResizedCopy(originalImage: BufferedImage, scaledWidth: Int, scaledHeight: Int, preserveAlpha: Boolean): BufferedImage = {
    val imageType = if (preserveAlpha) BufferedImage.TYPE_INT_RGB else BufferedImage.TYPE_INT_ARGB
    val scaledImage = new BufferedImage(scaledWidth, scaledHeight, imageType)
    val g: Graphics2D = scaledImage.createGraphics()
    if (preserveAlpha) {
      g.setColor(Color.WHITE)
      g.fillRect(0, 0, scaledWidth, scaledHeight)
    }
    g.drawImage(originalImage, 0, 0, scaledWidth, scaledHeight, null)
    g.dispose()
    scaledImage
  }

  private def saveAsJpeg(image: BufferedImage, path: Path): Unit = {
    val outputStream = new ByteArrayOutputStream()
    ImageIO.write(image, "jpg", outputStream)
    val jpegBytes = ByteString.fromArray(outputStream.toByteArray)

    val fileSink = FileIO.toPath(path)
    Source.single(jpegBytes).runWith(fileSink)
  }

  def getImagePath(imageName: String): Path = imagesDir.resolve(imageName)

  def getImages: Future[List[String]] = Future {
    Files.list(imagesDir).map(_.getFileName.toString).toArray.toList.asInstanceOf[List[String]]
  }
}
