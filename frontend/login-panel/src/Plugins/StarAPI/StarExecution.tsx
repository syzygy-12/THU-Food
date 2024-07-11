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

export const testStar = async (userId: number, objectId : number, starType: StarType): Promise<boolean> => {
    const message = new StarTestMessage(userId, objectId, starType);
    return await sendPostRequest(message);
};

export const createStar = async (userId: number, objectId : number, starType: StarType): Promise<void> => {
    const message = new StarCreateMessage(userId, objectId, starType);
    await sendPostRequest(message);
}

export const deleteStar = async (userId: number, objectId : number, starType: StarType): Promise<void> => {
    const message = new StarDeleteMessage(userId, objectId, starType);
    await sendPostRequest(message);
}

export const flipStar = async (userId: number, objectId : number, starType: StarType): Promise<void> => {
    const message = new StarFlipMessage(userId, objectId, starType);
    await sendPostRequest(message);
}

export const queryStaredObjectIdList = async (userId: number, starType: StarType): Promise<number[]> => {
    const message = new StaredObjectIdListQueryMessage(userId, starType);
    const result = await sendPostRequest(message);
    console.log(result);
    const objectIdList = JSON.parse(result);
    if (Array.isArray(objectIdList)) {
        return objectIdList;
    }
    return [];
}

export const queryStaredObjectStarCount = async (objectId: number, starType: StarType): Promise<number> => {
    const message = new StaredObjectStarCountMessage(objectId, starType);
    const result = await sendPostRequest(message);
    return result;
}

