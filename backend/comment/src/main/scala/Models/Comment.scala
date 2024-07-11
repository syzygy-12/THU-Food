package Models

import java.sql.Timestamp

case class Comment(
  id: Int,
  content: String,
  userId: Int,
  objectId: Int,
  likes: Int,
  createdAt: String,
)