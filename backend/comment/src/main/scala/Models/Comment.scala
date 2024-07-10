package Models

import java.sql.Timestamp

case class Comment(
  id: Int,
  content: String,
  userId: Int,
  objectId: Int,
  createdAt: String
)