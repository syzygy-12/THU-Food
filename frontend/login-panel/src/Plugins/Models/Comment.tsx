import { UserInfo } from 'Plugins/Models/User'

export interface Comment {
    id: number,
    content: string,
    userId: number,
    objectId: number,
    likes: number,
    createdAt: string,
    userInfo: UserInfo,
    liked: boolean
}