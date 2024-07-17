package Utils

import Common.API.PlanContext
import Common.DBAPI.*
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import Utils.StarTestUtils.testStar
import cats.effect.IO
import io.circe.generic.auto.*

lazy val starTypes = List(0, 1, 2)

object StarCreateUtils {
  def createStar(userId: Int, objectId: Int, starType: Int)(using planContext: PlanContext): IO[Unit] = {
    if (!starTypes.contains(starType)) {
      IO.raiseError(new Exception("Invalid starType"))
    } else {
      testStar(userId, objectId, starType).flatMap { exists =>
        if (exists) {
          IO.unit // 记录已经存在，不返回任何值
        } else {
          val insertQuery = s"INSERT INTO ${schemaName}.${tableName} (userid, objectid, startype) VALUES (?, ?, ?)"
          val insertParameters = List(
            SqlParameter("Int", userId.toString),
            SqlParameter("Int", objectId.toString),
            SqlParameter("Int", starType.toString)
          )
          writeDB(insertQuery, insertParameters).map(_ => ())
        }
      }
    }
  }
}
