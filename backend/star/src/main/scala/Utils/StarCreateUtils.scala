package Utils

import Common.API.PlanContext
import Common.DBAPI.*
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import Utils.StarTestUtils.testStar
import cats.effect.IO
import io.circe.generic.auto.*

object StarCreateUtils {
  def createStar(userId: Int, entryId: Int, starType: Int)(using planContext: PlanContext): IO[Boolean] = {
    testStar(userId, entryId, starType).flatMap { exists =>
      if (exists) {
        IO.pure(false) // 记录已经存在，返回 false
      } else {
        println("Create!!!!")
        val insertQuery = s"INSERT INTO ${schemaName}.${tableName} (userid, objectid, startype) VALUES (?, ?, ?)"
        val insertParameters = List(
          SqlParameter("Int", userId.toString),
          SqlParameter("Int", entryId.toString),
          SqlParameter("Int", starType.toString)
        )
        writeDB(insertQuery, insertParameters).map(_ => true)
      }
    }
  }
}


