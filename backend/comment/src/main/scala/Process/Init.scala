package Process

import Common.API.{API, PlanContext, TraceID}
import Global.{ServerConfig, ServiceCenter}
import Common.DBAPI.{initSchema, writeDB}
import Common.ServiceUtils.{schemaName, tableName}
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
           |CREATE SCHEMA IF NOT EXISTS ${schemaName};
           |""".stripMargin, List()
      )
      _ <- writeDB(
        s"""
           |CREATE TABLE IF NOT EXISTS ${schemaName}.${tableName} (
           |    id SERIAL PRIMARY KEY,
           |    userid INT,
           |    entryid INT,
           |    content TEXT,
           |    comment_type INT
           |)
           |""".stripMargin, List()
      )
      _ <- writeDB( s"CREATE INDEX IF NOT EXISTS idx_userid ON ${schemaName}.${tableName} (userid, comment_type)", List() )
      _ <- writeDB( s"CREATE INDEX IF NOT EXISTS idx_entryid ON ${schemaName}.${tableName} (entryid, comment_type)", List() )
    } yield ()
}
