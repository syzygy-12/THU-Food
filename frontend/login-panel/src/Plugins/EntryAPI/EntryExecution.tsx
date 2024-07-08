import { EntryCreateMessage, EntryTestMessage } from 'Plugins/EntryAPI/EntryMessage'
import { sendPostRequest } from 'Plugins/PostRequest'

export const createEntry = async (): Promise<number> => {
    const message = new EntryCreateMessage;
    return await sendPostRequest(message); // 直接返回结果
}

export const testEntry = async (id: number): Promise<boolean> => {
    const message = new EntryTestMessage(id);
    return await sendPostRequest(message); // 直接返回结果
}
