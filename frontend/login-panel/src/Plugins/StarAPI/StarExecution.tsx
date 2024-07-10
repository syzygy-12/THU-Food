import { sendPostRequest } from 'Plugins/CommonUtils/PostRequest'
import {
    StarCreateMessage,
    StaredEntryIdListQueryMessage,
    StarTestMessage,
} from 'Plugins/StarAPI/StarMessage'

export const testStar = async (userId: number, entryId : number): Promise<Boolean> => {
    const message = new StarTestMessage(userId, entryId);
    return await sendPostRequest(message);
};

export const createStar = async (userId: number, entryId : number): Promise<Boolean> => {
    const message = new StarCreateMessage(userId, entryId);
    return await sendPostRequest(message);
}

export const queryStaredEntryIdList = async (userId: number): Promise<number[]> => {
    const message = new StaredEntryIdListQueryMessage(userId);
    const result = await sendPostRequest(message);
    console.log(result);
    const entryIdList = JSON.parse(result);
    if (Array.isArray(entryIdList)) {
        return entryIdList;
    }
    return [];
}

