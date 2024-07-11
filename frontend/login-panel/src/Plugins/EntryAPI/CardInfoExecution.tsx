import { sendPostRequest } from 'Plugins/CommonUtils/PostRequest'
import {
    CardInfoQueryByFatherMessage,
    CardInfoQueryByGrandfatherMessage, CardInfoQueryByIdListMessage,
    CardInfoQueryMessage,
} from 'Plugins/EntryAPI/CradInfoMessage'
import { CardInfo } from 'Plugins/Models/Entry'

export const getCardInfo = async (id: number): Promise<CardInfo> => {
    const message = new CardInfoQueryMessage(id);
    return JSON.parse(await sendPostRequest(message)); // 直接返回结果
}

export const getCardInfoByFather = async (fatherId: number): Promise<CardInfo[]> => {
    const message = new CardInfoQueryByFatherMessage(fatherId);
    const cardInfoList = JSON.parse(await sendPostRequest(message));
    if (Array.isArray(cardInfoList)) {
        return cardInfoList;
    }
    return [];
}

export const getCardInfoByGrandFather = async (grandfatherId: number): Promise<CardInfo[]> => {
    const message = new CardInfoQueryByGrandfatherMessage(grandfatherId);
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
