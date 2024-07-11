import { sendPostRequest } from 'Plugins/CommonUtils/PostRequest'
import {
    StarCreateMessage,
    StarTestMessage,
    StarDeleteMessage,
    StarFlipMessage,
    StaredObjectIdListQueryMessage,
    StaredObjectStarCountMessage
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

export const createStar = async (userId: number, entryId : number, starType: StarType): Promise<void> => {
    const message = new StarCreateMessage(userId, entryId, starType);
    await sendPostRequest(message);
}

export const deleteStar = async (userId: number, entryId : number, starType: StarType): Promise<void> => {
    const message = new StarDeleteMessage(userId, entryId, starType);
    await sendPostRequest(message);
}

export const flipStar = async (userId: number, entryId : number, starType: StarType): Promise<void> => {
    const message = new StarFlipMessage(userId, entryId, starType);
    await sendPostRequest(message);
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

export const queryStaredObjectStarCount = async (entryId: number, starType: StarType): Promise<number> => {
    const message = new StaredObjectStarCountMessage(entryId, starType);
    const result = await sendPostRequest(message);
    return result;
}

