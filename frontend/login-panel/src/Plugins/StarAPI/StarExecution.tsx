import { sendPostRequest } from 'Plugins/CommonUtils/PostRequest'
import {
    StarCreateMessage,
    StarTestMessage,
    StarDeleteMessage,
    StaredObjectIdListQueryMessage,
} from 'Plugins/StarAPI/StarMessage'

export enum StarType {
    StarForEntry = 0,
    LikeForComment = 1,
    LikeForBlog = 2,
}

export const testStar = async (userId: number, entryId : number, starType: StarType): Promise<boolean> => {
    const message = new StarTestMessage(userId, entryId, starType);
    return await sendPostRequest(message);
};

export const createStar = async (userId: number, entryId : number, starType: StarType): Promise<boolean> => {
    const message = new StarCreateMessage(userId, entryId, starType);
    return await sendPostRequest(message);
}

export const deleteStar = async (userId: number, entryId : number, starType: StarType): Promise<string> => {
    const message = new StarDeleteMessage(userId, entryId, starType);
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

