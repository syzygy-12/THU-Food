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
           |  father_id INT,
           |  grandfather_id INT,
           |  name TEXT,
           |  stars INT,
           |  score_histogram INT[],
           |  is_hidden BOOLEAN,
           |  is_new BOOLEAN,
           |  is_food BOOLEAN,
           |  article TEXT,
           |  image TEXT
           |)
           |""".stripMargin, List()
      )
      _ <- writeDB( s"CREATE INDEX IF NOT EXISTS idx_father_id ON ${schemaName}.${tableName} (father_id)", List() )
      _ <- writeDB( s"CREATE INDEX IF NOT EXISTS idx_grandfather_id ON ${schemaName}.${tableName} (grandfather_id)", List() )
      checkRootExists <- readDBBoolean(s"SELECT EXISTS(SELECT 1 FROM ${schemaName}.${tableName} WHERE id = 1)", List())
      _ <- if (!checkRootExists) {
          entryCreate(0, 0)
        } else {
          IO.unit
        }
    } yield ()
  }
}
