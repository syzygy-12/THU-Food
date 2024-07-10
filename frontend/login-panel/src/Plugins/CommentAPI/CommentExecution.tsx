import { sendPostRequest } from 'Plugins/CommonUtils/PostRequest'
import { Comment } from 'Plugins/Models/Comment'
import {
    CommentCreateMessage,
    CommentDeleteMessage, CommentModifyMessage, CommentQueryByObjectMessage,
    CommentQueryByUserMessage,
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

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString();
}

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

export const queryCommentByObject = async (objectId: number, commentType: CommentType): Promise<Comment[]> => {
    const message = new CommentQueryByObjectMessage(objectId, commentType);
    const result = await sendPostRequest(message);
    console.log(result);
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
    console.log(result);
    const commentList = JSON.parse(result);
    if (Array.isArray(commentList)) {
        return commentList.map(comment => ({
            ...comment,
            createdAt: formatTimestamp(comment.createdAt)
        }));
    }
    return [];
}
