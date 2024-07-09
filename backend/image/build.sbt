name := "Image"

version := "0.1"

scalaVersion := "2.13.8"

libraryDependencies ++= Seq(
  "com.typesafe.akka" %% "akka-actor-typed" % "2.6.19",
  "com.typesafe.akka" %% "akka-http" % "10.2.9",
  "com.typesafe.akka" %% "akka-stream" % "2.6.19",
  "de.heikoseeberger" %% "akka-http-circe" % "1.39.2",
  "io.circe" %% "circe-generic" % "0.14.2",
  "ch.qos.logback" % "logback-classic" % "1.2.11",
  "ch.megard" %% "akka-http-cors" % "1.1.3"
)
