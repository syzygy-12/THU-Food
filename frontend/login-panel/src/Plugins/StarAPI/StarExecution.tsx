import { sendPostRequest } from 'Plugins/CommonUtils/PostRequest'
import {
    StarCreateMessage,
    StaredObjectIdListQueryMessage,
    StarTestMessage,
} from 'Plugins/StarAPI/StarMessage'

export enum StarType {
    StarForEntry,
    LikeForComment,
    LikeForBlog,
}

export const testStar = async (userId: number, entryId : number, starType: StarType): Promise<Boolean> => {
    const message = new StarTestMessage(userId, entryId, starType);
    return await sendPostRequest(message);
};

export const createStar = async (userId: number, entryId : number, starType: StarType): Promise<Boolean> => {
    const message = new StarCreateMessage(userId, entryId, starType);
    return await sendPostRequest(message);
}

export const queryStaredObjectIdList = async (userId: number, starType: StarType): Promise<number[]> => {
    const message = new StaredObjectIdListQueryMessage(userId, starType);
    const result = await sendPostRequest(message);
    console.log(result);
    const entryIdList = JSON.parse(result);
    if (Array.isArray(entryIdList)) {
        return entryIdList;
    }
    return [];
}

