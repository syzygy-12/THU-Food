package Process

import Common.API.{API, PlanContext, TraceID}
import Global.{ServerConfig, ServiceCenter}
import Common.DBAPI.{initSchema, readDBBoolean, writeDB}
import Common.Object.SqlParameter
import Common.ServiceUtils.schemaName
import cats.effect.IO
import io.circe.generic.auto.*
import org.http4s.client.Client

import java.util.UUID

object Init {
  def init(config: ServerConfig): IO[Unit] = {
    given PlanContext = PlanContext(traceID = TraceID(UUID.randomUUID().toString), 0)
    for {
      _ <- API.init(config.maximumClientConnection)
      _ <- initSchema(schemaName)
      _ <- writeDB(
        s"""
           |CREATE TABLE IF NOT EXISTS ${schemaName}.node_info (
           |  id SERIAL PRIMARY KEY,
           |  "fatherId" INT,
           |  son INT[],
           |  "entryId" INT
           |)
           |""".stripMargin, List()
      )
<<<<<<< Updated upstream
=======
      checkNodeExists <- readDBBoolean(s"SELECT EXISTS(SELECT 1 FROM ${schemaName}.node_info WHERE id = ?)",
        List(SqlParameter("Int", Integer.toString(1)))
      )
      _ <- if (!checkNodeExists) {
          writeDB(
            s"INSERT INTO ${schemaName}.node_info (\"fatherId\", son, \"entryId\") VALUES (?, CAST(? AS INTEGER[]), ?)",
            List(
              SqlParameter("Int", "0"),
              SqlParameter("String", "{}"),
              SqlParameter("Int", "0")
            )
          )
        } else {
          IO.unit
        }
>>>>>>> Stashed changes
    } yield ()
  }
}
