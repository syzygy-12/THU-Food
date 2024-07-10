import { sendPostRequest } from 'Plugins/PostRequest'
import {
    CommentIdListQueryMessage,
    CommentIdInsertMessage,
} from 'Plugins/UserAPI/CommentIdListMessage'

export const queryUserCommentIdList = async (userId: number): Promise<number[]> => {
    const message = new CommentIdListQueryMessage(userId);
    const result = await sendPostRequest(message);
    const commentIdList = JSON.parse(result);
    if (Array.isArray(commentIdList)) {
        return commentIdList;
    }
    return [];
}

export const insertUserCommentId = async (userId: number, newCommentId: number): Promise<void> => {
    const message = new CommentIdInsertMessage(userId, newCommentId);
    await sendPostRequest(message);
}

