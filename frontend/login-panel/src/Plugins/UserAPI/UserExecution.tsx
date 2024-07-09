import { sendPostRequest } from 'Plugins/PostRequest'
import {
    UserAuthorityChangeMessage,
    UserLoginMessage,
    UserPasswordChangeMessage,
    UserRegisterMessage,
} from 'Plugins/UserAPI/UserMessage'
import { UserLoginResponse } from 'Plugins/Models/User'

const jsonStringToUserLoginResponse = (jsonString: string): UserLoginResponse => {
    const obj = JSON.parse(jsonString);
    return obj as UserLoginResponse;
}

export const userRegister = async (userName: string, password: string): Promise<Boolean> => {
    const message = new UserRegisterMessage(userName, password);
    return await sendPostRequest(message);
}

export const userLogin = async (userName: string, password: string): Promise<UserLoginResponse | null> => {
    const message = new UserLoginMessage(userName, password);
    return jsonStringToUserLoginResponse(await sendPostRequest(message));
}

export const userPasswordChange = async (userId: number, password: string, newPassword: string): Promise<Boolean> => {
    const message = new UserPasswordChangeMessage(userId, password, newPassword);
    return await sendPostRequest(message);
}

export const userAuthorityChange = async (userName: String, newAuthority: number): Promise<Boolean> => {
    const message = new UserAuthorityChangeMessage(userName, newAuthority);
    return await sendPostRequest(message);
}
