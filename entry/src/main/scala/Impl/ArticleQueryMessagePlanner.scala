package Impl

import Common.API.{PlanContext, Planner}
import Utils.ArticleQueryUtils.articleQuery
import cats.effect.IO
import io.circe.generic.auto.*

case class ArticleQueryMessagePlanner(id: Int, override val planContext: PlanContext) extends Planner[String] {
  override def plan(using PlanContext): IO[String] = {
    articleQuery(id)
  }
}
