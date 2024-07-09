package com.example

import akka.actor.typed.ActorSystem
import akka.actor.typed.scaladsl.Behaviors
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Route
import com.typesafe.config.ConfigFactory
import akka.stream.Materializer
import ch.megard.akka.http.cors.scaladsl.CorsDirectives._
import ch.megard.akka.http.cors.scaladsl.settings.CorsSettings

import scala.concurrent.ExecutionContextExecutor
import scala.util.{Failure, Success}
import scala.io.StdIn

object Main {
  def main(args: Array[String]): Unit = {
    implicit val system: ActorSystem[Nothing] = ActorSystem(Behaviors.empty, "image-upload-system")
    implicit val executionContext: ExecutionContextExecutor = system.executionContext
    implicit val materializer: Materializer = Materializer(system)

    val config = ConfigFactory.load()
    val host = config.getString("akka.http.host")
    val port = config.getInt("akka.http.port")

    val settings = CorsSettings.defaultSettings
    val imageService = new ImageService()
    val imageRoutes = new ImageRoutes(imageService)
    val routes: Route = cors(settings) {
      imageRoutes.routes
    }

    val bindingFuture = Http().newServerAt(host, port).bind(routes)

    bindingFuture.onComplete {
      case Success(binding) =>
        val address = binding.localAddress
        println(s"Server online at http://${address.getHostString}:${address.getPort}/")
      case Failure(ex) =>
        println(s"Failed to bind HTTP endpoint, terminating system: ${ex.getMessage}")
        system.terminate()
    }

    println("Press RETURN to stop...")
    StdIn.readLine() // Wait for user input to terminate
    bindingFuture
      .flatMap(_.unbind())
      .onComplete(_ => system.terminate())
  }
}
