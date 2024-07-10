import { EntryCreateMessage, EntryTestMessage } from 'Plugins/EntryAPI/EntryMessage'
import { sendPostRequest } from 'Plugins/PostRequest'
import {
    CommentIdInsertMessage,
    CommentIdListQueryMessage,
} from 'Plugins/EntryAPI/CommentIdListMessage'

export const queryEntryCommentIdList = async (id: number): Promise<number> => {
    const message = new CommentIdListQueryMessage(id);
    return await sendPostRequest(message); // 直接返回结果
}

export const insertEntryCommentId = async (id: number, newCommentId: number): Promise<boolean> => {
    const message = new CommentIdInsertMessage(id, newCommentId);
    return await sendPostRequest(message); // 直接返回结果
}
