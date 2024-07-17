import { sendPostRequest } from 'Plugins/CommonUtils/PostRequest'
import {
    UserAuthorityChangeMessage, UserAvatarChangeMessage, UserInfoQueryByIdListMessage, UserInfoQueryMessage,
    UserLoginMessage, UserNicknameChangeMessage,
    UserPasswordChangeMessage,
    UserRegisterMessage,
} from 'Plugins/UserAPI/UserMessage'
import { UserInfo, UserLoginResponse } from 'Plugins/Models/User'

export const userRegister = async (userName: string, password: string): Promise<boolean> => {
    return await sendPostRequest(new UserRegisterMessage(userName, password));
}

export const userLogin = async (userName: string, password: string): Promise<UserLoginResponse> => {
    return JSON.parse(await sendPostRequest(new UserLoginMessage(userName, password)));
}

export const changeUserPassword = async (userId: number, password: string, newPassword: string): Promise<Boolean> => {
    return await sendPostRequest(new UserPasswordChangeMessage(userId, password, newPassword));
}

export const changeUserAuthority = async (userName: String, newAuthority: number): Promise<Boolean> => {
    return await sendPostRequest(new UserAuthorityChangeMessage(userName, newAuthority));
}

export const getUserInfo = async (userId: number): Promise<UserInfo> => {
    return JSON.parse(await sendPostRequest(new UserInfoQueryMessage(userId)));
}

export const getUserInfoByIdList = async (userIdList: number[]): Promise<UserInfo[]> => {
    const message = new UserInfoQueryByIdListMessage(userIdList);
    const cardInfoList = JSON.parse(await sendPostRequest(message));
    if (Array.isArray(cardInfoList)) {
        return cardInfoList;
    }
    return [];
}

export const changeUserNickname = async (userId: number, newNickname: string): Promise<void> => {
    await sendPostRequest(new UserNicknameChangeMessage(userId, newNickname));
}

export const changeUserAvatar = async (userId: number, newAvatar: string): Promise<void> => {
    await sendPostRequest(new UserAvatarChangeMessage(userId, newAvatar));
}
