package Impl

import Common.API.{PlanContext, Planner}
import Utils.ArticleModifyUtils.articleModify
import cats.effect.IO
import io.circe.generic.auto.*

case class ArticleModifyMessagePlanner(id: Int, newArticle: String, override val planContext: PlanContext) extends Planner[Boolean] {
  override def plan(using PlanContext): IO[Boolean] = {
    articleModify(id, newArticle)
  }
}
