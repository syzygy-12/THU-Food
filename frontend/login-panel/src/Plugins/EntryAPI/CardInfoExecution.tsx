import { sendPostRequest } from 'Plugins/CommonUtils/PostRequest'
import {
    CardInfoQueryByFatherMessage,
    CardInfoQueryByGrandfatherMessage, CardInfoQueryByIdListMessage,
    CardInfoQueryMessage, ImageModifyMessage, IsFoodModifyMessage, IsHiddenModifyMessage, IsNewModifyMessage,
} from 'Plugins/EntryAPI/CradInfoMessage'
import { CardInfo } from 'Plugins/Models/Entry'

export const getCardInfo = async (id: number): Promise<CardInfo | null> => {
    const message = new CardInfoQueryMessage(id);
    const ret = await sendPostRequest(message);
    console.log(ret)
    return JSON.parse(ret); // 直接返回结果
}

export const getCardInfoByFather = async (fatherID: number): Promise<CardInfo[]> => {
    const message = new CardInfoQueryByFatherMessage(fatherID);
    const cardInfoList = JSON.parse(await sendPostRequest(message));
    if (Array.isArray(cardInfoList)) {
        return cardInfoList;
    }
    return [];
}

export const getCardInfoByGrandfather = async (grandfatherID: number): Promise<CardInfo[]> => {
    const message = new CardInfoQueryByGrandfatherMessage(grandfatherID);
    const cardInfoList = JSON.parse(await sendPostRequest(message));
    if (Array.isArray(cardInfoList)) {
        return cardInfoList;
    }
    return [];
}

export const getCardInfoByIdList = async (idList: number[]): Promise<CardInfo[]> => {
    const message = new CardInfoQueryByIdListMessage(idList);
    const cardInfoList = JSON.parse(await sendPostRequest(message));
    if (Array.isArray(cardInfoList)) {
        return cardInfoList;
    }
    return [];
}

export const changeImage = async (id: number, image: string): Promise<boolean> => {
    return await sendPostRequest(new ImageModifyMessage(id, image));
}

export const changeIsNew = async (id: number, isNew: boolean): Promise<boolean> => {
    return await sendPostRequest(new IsNewModifyMessage(id, isNew));
}

export const changeIsFood = async (id: number, isFood: boolean): Promise<boolean> => {
    return await sendPostRequest(new IsFoodModifyMessage(id, isFood));
}

export const changeIsHidden = async (id: number, isHidden: boolean): Promise<boolean> => {
    return await sendPostRequest(new IsHiddenModifyMessage(id, isHidden));
}
