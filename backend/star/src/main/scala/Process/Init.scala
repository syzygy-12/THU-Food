package Process

import Common.API.{API, PlanContext, TraceID}
import Global.ServerConfig
import Common.DBAPI.{initSchema, readDBBoolean, writeDB}
import Common.Object.SqlParameter
import Common.ServiceUtils.{schemaName, tableName}
import cats.effect.IO
import io.circe.generic.auto.*

import java.util.UUID

object Init {
  def init(config: ServerConfig): IO[Unit] = {
    given PlanContext = PlanContext(traceID = TraceID(UUID.randomUUID().toString), 0)
    for {
      _ <- API.init(config.maximumClientConnection)
      _ <- IO(println(schemaName))
      _ <- initSchema(schemaName)
      _ <- writeDB(
        s"""
           |CREATE TABLE IF NOT EXISTS ${schemaName}.${tableName} (
           |    userid INT,
           |    entryid INT,
           |    PRIMARY KEY (userid, entryid)
           |)
           |""".stripMargin, List()
      )
      _ <- writeDB( s"CREATE INDEX IF NOT EXISTS idx_userid ON ${schemaName}.${tableName} (userid)", List() )
    } yield ()
  }
}
