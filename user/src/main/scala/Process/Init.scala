package Process

import Common.API.{API, PlanContext, TraceID}
import Global.{ServerConfig, ServiceCenter}
import Common.DBAPI.{initSchema, writeDB}
import Common.ServiceUtils.schemaName
import cats.effect.IO
import io.circe.generic.auto.*
import org.http4s.client.Client

import java.util.UUID

object Init {
  def init(config:ServerConfig):IO[Unit]=
    given PlanContext=PlanContext(traceID = TraceID(UUID.randomUUID().toString),0)
    for {
      _ <- API.init(config.maximumClientConnection)
      _ <- initSchema(schemaName)
      _ <- writeDB(
        s"""
           |CREATE SCHEMA IF NOT EXISTS "${schemaName}";
           |""".stripMargin, List()
      )
      _ <- writeDB(
        s"""
           |CREATE TABLE IF NOT EXISTS "${schemaName}".user_info (
           |  id SERIAL PRIMARY KEY,
           |  username TEXT,
           |  password TEXT,
           |  authority INT,
           |  nickname TEXT,
           |  avatar TEXT
           |)
           |""".stripMargin, List()
      )
      _ <- writeDB(
        s"""
           |CREATE TABLE IF NOT EXISTS "${schemaName}".token (
           |  token TEXT PRIMARY KEY,
           |  userid INT,
           |  authority INT,
           |  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
           |)
           |""".stripMargin, List()
      )
    } yield ()
}
