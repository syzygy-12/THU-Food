import { EntryCreateMessage, EntryDeleteMessage, EntryTestMessage } from 'Plugins/EntryAPI/EntryMessage'
import { sendPostRequest } from 'Plugins/CommonUtils/PostRequest'

export const createEntry = async (fatherID: number, grandfatherID: number): Promise<number> => {
    const message = new EntryCreateMessage(fatherID, grandfatherID);
    return await sendPostRequest(message); // 直接返回结果
}

export const testEntry = async (id: number): Promise<boolean> => {
    const message = new EntryTestMessage(id);
    return await sendPostRequest(message); // 直接返回结果
}

export const deleteEntry = async (id: number): Promise<number> => {
    const message = new EntryDeleteMessage(id);
    return await sendPostRequest(message); // 直接返回结果
}
