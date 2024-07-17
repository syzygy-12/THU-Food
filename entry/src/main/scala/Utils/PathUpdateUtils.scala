package Utils

import Common.API.PlanContext
import Common.DBAPI.{readDBBoolean, writeDB}
import Common.Object.SqlParameter
import Common.ServiceUtils.*
import Utils.CardInfoQueryByFatherUtils.cardInfoQueryByFather
import Utils.PathModifyUtils.pathModify
import cats.effect.IO
import io.circe.generic.auto.*

object PathUpdateUtils {
  def pathUpdate(id: Int, path: String)(using planContext: PlanContext): IO[Unit] = {
    // 查询数据库中的记录
    cardInfoQueryByFather(id).flatMap { sonInfo =>
      if (sonInfo.isEmpty)
        IO.unit
      else {
        sonInfo.foldLeft(IO.unit) { (acc, info) =>
          acc.flatMap { _ =>
            val sonId = info.id
            for {
              _ <- pathModify(sonId, path)
              _ <- pathUpdate(sonId, path + info.name + "/")
            } yield ()
          }
        }
      }
    }
  }
}
