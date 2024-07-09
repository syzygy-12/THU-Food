package com.example

import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import akka.http.scaladsl.model.{ContentType, HttpEntity, MediaTypes}
import java.nio.file.{Files, Paths}
import akka.stream.scaladsl.FileIO
import scala.concurrent.ExecutionContext

class ImageRoutes(imageService: ImageService)(implicit ec: ExecutionContext) {
  def routes: Route = pathPrefix("images") {
    concat(
      pathEnd {
        concat(
          post {
            fileUpload("image") {
              case (fileInfo, fileStream) =>
                onSuccess(imageService.saveImage(fileInfo, fileStream)) { baseName =>
                  complete(baseName)
                }
            }
          },
          get {
            onSuccess(imageService.getImages) { images =>
              complete(images.mkString("\n"))
            }
          }
        )
      },
      path(Segment) { imageName =>
        get {
          val imagePath = Paths.get("images").resolve(imageName)
          if (Files.exists(imagePath)) {
            val fileStream = FileIO.fromPath(imagePath)
            val contentType = ContentType(MediaTypes.`image/jpeg`)
            complete(HttpEntity(contentType, fileStream))
          } else {
            complete(s"Image $imageName not found")
          }
        }
      }
    )
  }
}
