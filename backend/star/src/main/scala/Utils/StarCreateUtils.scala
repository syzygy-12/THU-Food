package Utils

import Common.API.PlanContext
import Common.DBAPI.*
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import Utils.StarTestUtils.testStar
import cats.effect.IO
import io.circe.generic.auto.*

object StarCreateUtils {
  def createStar(userId: Int, entryId: Int)(using planContext: PlanContext): IO[Boolean] = {
    testStar(userId, entryId).flatMap { exists =>
      if (exists) {
        println("exists!!!!")
        IO.pure(false) // 记录已经存在，返回 false
      } else {
        println("Create!!!!")
        val insertQuery = s"INSERT INTO ${schemaName}.${tableName} (userid, entryid) VALUES (?, ?)"
        val insertParameters = List(
          SqlParameter("Int", userId.toString),
          SqlParameter("Int", entryId.toString)
        )
        writeDB(insertQuery, insertParameters).map(_ => true)
      }
    }
  }
}


