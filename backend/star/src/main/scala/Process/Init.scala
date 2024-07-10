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
           |    objectid INT,
           |    startype INT,
           |    PRIMARY KEY (userid, objectid, startype)
           |)
           |""".stripMargin, List()
      )
      _ <- writeDB( s"CREATE INDEX IF NOT EXISTS idx_user ON ${schemaName}.${tableName} (userid, startype)", List() )
      _ <- writeDB( s"CREATE INDEX IF NOT EXISTS idx_object ON ${schemaName}.${tableName} (objectid, startype)", List() )
    } yield ()
  }
}
