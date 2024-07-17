package Utils

import Common.API.PlanContext
import Common.DBAPI.*
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import cats.effect.IO

object StarTestByUserIdAndObjectIdListUtils {
  def testStarByUserIdAndObjectIdList(userId: Int, objectIdList: List[Int], starType: Int)(using planContext: PlanContext): IO[String] = {
    val resultStr = readDBString(
      s"""
         |SELECT array(
         |    SELECT CASE
         |        WHEN EXISTS (
         |            SELECT 1
         |            FROM star.star_info
         |            WHERE star.star_info.userid = ?
         |              AND startype = ?
         |              AND objectid = objects.object
         |        )
         |        THEN TRUE ELSE FALSE END
         |    FROM (VALUES (${objectIdList.mkString("),(")})) AS objects(object)
         |)""".stripMargin,
      List(
        SqlParameter("Int", userId.toString),
        SqlParameter("Int", starType.toString)
      )
    )
    resultStr.attempt.flatMap {
      case Right(str) =>
        IO(str.replace("{", "")
          .replace("}", "")
          .replace(",", "")
          .replace("t", "1")
          .replace("f", "0"))
      case Left(error) => IO.raiseError(error)
    }
  }
}
