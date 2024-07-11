package Process

import Common.API.{API, PlanContext, TraceID}
import Global.ServerConfig
import Common.DBAPI.{initSchema, readDBBoolean, writeDB}
import Common.Object.SqlParameter
import Common.ServiceUtils.{schemaName, tableName}
import cats.effect.IO
import io.circe.generic.auto.*
import Utils.EntryCreateUtils.entryCreate

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
           |  id SERIAL PRIMARY KEY,
           |  fatherid INT,
           |  grandfatherid INT,
           |  name TEXT,
           |  stars INT,
           |  scoreHistogram INT[]
           |)
           |""".stripMargin, List()
      )
      _ <- writeDB( s"CREATE INDEX IF NOT EXISTS idx_fatherid ON ${schemaName}.${tableName} (fatherid)", List() )
      _ <- writeDB( s"CREATE INDEX IF NOT EXISTS idx_grandfatherid ON ${schemaName}.${tableName} (grandfatherid)", List() )
      checkRootExists <- readDBBoolean(s"SELECT EXISTS(SELECT 1 FROM ${schemaName}.${tableName} WHERE id = ?)",
        List(SqlParameter("Int", Integer.toString(1)))
      )
      _ <- if (!checkRootExists) {
          entryCreate(0, 0)
        } else {
          IO.unit
        }
    } yield ()
  }
}
