import { sendPostRequest } from 'Plugins/CommonUtils/PostRequest'
import { AdCreateMessage, AdDeleteMessage, AdListQueryMessage, AdModifyMessage } from './AdvertisementMessage'
import { Advertisement } from 'Plugins/Models/Advertisement'

export const createAd = async (): Promise<number> => {
    return await sendPostRequest(new AdCreateMessage()); // 直接返回结果
}

export const deleteAd = async (id: number): Promise<boolean> => {
    return await sendPostRequest(new AdDeleteMessage(id)); // 直接返回结果
}

export const modifyAd = async (id: number, entryid: number, image: string): Promise<boolean> => {
    return await sendPostRequest(new AdModifyMessage(id, entryid, image)); // 直接返回结果
}

export const getAdList = async (): Promise<Advertisement[]> => {
    const AdvertisementList = await sendPostRequest(new AdListQueryMessage())
    if (Array.isArray(AdvertisementList)) {
        return AdvertisementList
    }
    return [];
}