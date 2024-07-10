import { sendPostRequest } from 'Plugins/CommonUtils/PostRequest'
import { Comment } from 'Plugins/Models/Comment'
import {
    CommentCreateMessage,
    CommentDeleteMessage,
    CommentQueryByObjectMessage,
    CommentQueryByUserMessage,
} from 'Plugins/CommentAPI/CommentMessage'

export enum CommentType {
    ScoreForEntry,
    CommentForEntry,
    CommentForBlog,
}

export const createComment = async (content: string, userId: number, entryId: number, commentType: CommentType): Promise<number> => {
    const message = new CommentCreateMessage(content, userId, entryId, commentType);
    return await sendPostRequest(message); // 直接返回结果
}

export const deleteComment = async (id: number): Promise<boolean> => {
    const message = new CommentDeleteMessage(id);
    return await sendPostRequest(message); // 直接返回结果
}

export const queryCommentByObject = async (entryId: number, commentType: CommentType): Promise<Comment[]> => {
    const message = new CommentQueryByObjectMessage(entryId, commentType);
    const result = await sendPostRequest(message);
    console.log(result);
    const commentList = JSON.parse(result);
    if (Array.isArray(commentList)) {
        return commentList;
    }
    return [];
}

export const queryCommentByUser = async (userId: number, commentType: CommentType): Promise<Comment[]> => {
    const message = new CommentQueryByUserMessage(userId, commentType);
    const result = await sendPostRequest(message);
    console.log(result);
    const commentList = JSON.parse(result);
    if (Array.isArray(commentList)) {
        return commentList;
    }
    return [];
}
