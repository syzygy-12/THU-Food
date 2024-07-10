import { EntryCreateMessage, EntryTestMessage } from 'Plugins/EntryAPI/EntryMessage'
import { sendPostRequest } from 'Plugins/PostRequest'
import {
    CommentIdInsertMessage,
    CommentIdListQueryMessage,
} from 'Plugins/EntryAPI/CommentIdListMessage'

export const queryEntryCommentIdList = async (id: number): Promise<number[]> => {
    const message = new CommentIdListQueryMessage(id);
    console.log(message);
    const result = await sendPostRequest(message);
    console.log(result);
    /*const commentIdList = JSON.parse(result);
    if (Array.isArray(commentIdList)) {
        return commentIdList;
    }*/
    return [];
}

export const insertEntryCommentId = async (id: number, newCommentId: number): Promise<boolean> => {
    const message = new CommentIdInsertMessage(id, newCommentId);
    return await sendPostRequest(message); // 直接返回结果
}
