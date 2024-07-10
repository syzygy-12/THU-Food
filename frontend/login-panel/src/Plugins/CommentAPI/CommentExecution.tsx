import { sendPostRequest } from 'Plugins/CommonUtils/PostRequest'
import { Comment } from 'Plugins/Models/Comment'
import {
    CommentCreateMessage,
    CommentDeleteMessage,
    CommentQueryByEntryMessage,
    CommentQueryByUserMessage
} from 'Plugins/CommentAPI/CommentMessage'

const jsonStringToComment = (jsonString: string): Comment => {
    const obj = JSON.parse(jsonString);
    return obj as Comment;
}

export const createComment = async (content: string, userId: number, entryId: number): Promise<number> => {
    const message = new CommentCreateMessage(content, userId, entryId);
    return await sendPostRequest(message); // 直接返回结果
}

export const deleteComment = async (id: number): Promise<boolean> => {
    const message = new CommentDeleteMessage(id);
    return await sendPostRequest(message); // 直接返回结果
}

export const queryCommentByEntry = async (entryId: number): Promise<Comment[]> => {
    const message = new CommentQueryByEntryMessage(entryId);
    const result = await sendPostRequest(message);
    console.log(result);
    const commentList = JSON.parse(result);
    if (Array.isArray(commentList)) {
        return commentList;
    }
    return [];
}

export const queryCommentByUser = async (userId: number): Promise<Comment[]> => {
    const message = new CommentQueryByUserMessage(userId);
    const result = await sendPostRequest(message);
    console.log(result);
    const commentList = JSON.parse(result);
    if (Array.isArray(commentList)) {
        return commentList;
    }
    return [];
}
