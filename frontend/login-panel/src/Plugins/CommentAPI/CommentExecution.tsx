import { sendPostRequest } from 'Plugins/PostRequest'
import { Comment } from 'Plugins/Models/Comment'
import {
    CommentCreateMessage,
    CommentDeleteMessage,
    CommentQueryMessage,
    CommentTestMessage,
} from 'Plugins/CommentAPI/CommentMessage'

const jsonStringToComment = (jsonString: string): Comment => {
    const obj = JSON.parse(jsonString);
    return obj as Comment;
}

export const createComment = async (content: string, userId: number, entryId: number): Promise<number> => {
    const message = new CommentCreateMessage(content, userId, entryId);
    return await sendPostRequest(message); // 直接返回结果
}

export const testComment = async (id: number): Promise<boolean> => {
    const message = new CommentTestMessage(id);
    return await sendPostRequest(message); // 直接返回结果
}

export const deleteComment = async (id: number): Promise<boolean> => {
    const message = new CommentDeleteMessage(id);
    return await sendPostRequest(message); // 直接返回结果
}

export const queryComment = async (id: number): Promise<boolean> => {
    const message = new CommentQueryMessage(id);
    return await sendPostRequest(message); // 直接返回结果
}
