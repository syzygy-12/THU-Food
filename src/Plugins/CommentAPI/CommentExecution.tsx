import { sendPostRequest } from 'Plugins/CommonUtils/PostRequest'
import { Comment } from 'Plugins/Models/Comment'
import {
    CommentCreateMessage,
    CommentDeleteMessage, CommentModifyMessage, CommentQueryByObjectMessage,
    CommentQueryByUserMessage,
    CommentLikesQueryMessage,
    ScoreHistogramFlipMessage, CommentQueryMessage, CommentTestMessage, CommentQueryByIdListMessage,
} from 'Plugins/CommentAPI/CommentMessage'

export enum CommentType {
    ScoreForEntry = 0,
    CommentForEntry = 1,
    CommentForBlog = 2,
    Blog = 3
}

const formatTimestamp = (timestamp: string): string => {
    const date = new Date(parseInt(timestamp));
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export const createComment = async (content: string, userId: number, objectId: number, commentType: CommentType): Promise<number> => {
    const message = new CommentCreateMessage(content, userId, objectId, commentType);
    return await sendPostRequest(message); // 直接返回结果
}

export const deleteComment = async (id: number): Promise<boolean> => {
    const message = new CommentDeleteMessage(id);
    return await sendPostRequest(message); // 直接返回结果
}

export const modifyComment = async (id: number, content: string): Promise<boolean> => {
    const message = new CommentModifyMessage(id, content);
    return await sendPostRequest(message); // 直接返回结果
}

export const testComment = async (userId: number, objectId: number, commentType: CommentType): Promise<boolean> => {
    const message = new CommentTestMessage(userId, objectId, commentType);
    return await sendPostRequest(message);
}

export const queryComment = async (userId: number, objectId: number, commentType: CommentType): Promise<Comment> => {
    const message = new CommentQueryMessage(userId, objectId, commentType);
    const result = await sendPostRequest(message);
    const comment = JSON.parse(result);
    return {
        ...comment,
        createdAt: formatTimestamp(comment.createdAt)
    };
}

export const queryCommentByIdList = async (idList: number[]): Promise<Comment[]> => {
    const message = new CommentQueryByIdListMessage(idList);
    const result = await sendPostRequest(message);
    const commentList = JSON.parse(result);
    if (Array.isArray(commentList)) {
        return commentList.map(comment => ({
            ...comment,
            createdAt: formatTimestamp(comment.createdAt)
        }));
    }
    return [];
}

export const queryCommentByObject = async (objectId: number, commentType: CommentType): Promise<Comment[]> => {
    const message = new CommentQueryByObjectMessage(objectId, commentType);
    const result = await sendPostRequest(message);
    const commentList = JSON.parse(result);
    if (Array.isArray(commentList)) {
        return commentList.map(comment => ({
            ...comment,
            createdAt: formatTimestamp(comment.createdAt)
        }));
    }
    return [];
}

export const queryCommentByUser = async (userId: number, commentType: CommentType): Promise<Comment[]> => {
    const message = new CommentQueryByUserMessage(userId, commentType);
    const result = await sendPostRequest(message);
    const commentList = JSON.parse(result);
    if (Array.isArray(commentList)) {
        return commentList.map(comment => ({
            ...comment,
            createdAt: formatTimestamp(comment.createdAt)
        }));
    }
    return [];
}

export const queryCommentLikes = async (commentId: number): Promise<number> => {
    const message = new CommentLikesQueryMessage(commentId);
    return await sendPostRequest(message);
}

export const flipScoreHistogram = async (score: number, userId: number, objectId: number): Promise<void> => {
    const message = new ScoreHistogramFlipMessage(score, userId, objectId);
    await sendPostRequest(message);
}