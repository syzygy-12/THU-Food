import { API } from "Plugins/CommonUtils/API";

export abstract class UserMessage extends API {
    override serviceName:string="User"
}

export class UserLoginMessage extends UserMessage {
    userName: string;
    password: string;

    constructor(userName: string, password: string) {
        super();
        this.userName = userName;
        this.password = password;
    }
}

export class UserRegisterMessage extends UserMessage {
    userName: string;
    password: string;

    constructor(userName: string, password: string) {
        super();
        this.userName = userName;
        this.password = password;
    }
}

export class UserPasswordChangeMessage extends UserMessage {
    userId: number;
    password: string;
    newPassword: string;

    constructor(userId: number, password: string, newPassword: string) {
        super();
        this.userId = userId;
        this.password = password;
        this.newPassword = newPassword;
    }
}

export class UserAuthorityChangeMessage extends UserMessage {
    userName: String;
    newAuthority: number;

    constructor(userName: String, newAuthority: number) {
        super();
        this.userName = userName;
        this.newAuthority = newAuthority;
    }
}

export class UserInfoQueryMessage extends UserMessage {
    id: number;

    constructor(id: number) {
        super();
        this.id = id;
    }
}

export class UserInfoQueryByIdListMessage extends UserMessage {
    idList: number[];

    constructor(idList: number[]) {
        super();
        this.idList = idList;
    }
}

export class UserNicknameChangeMessage extends UserMessage {
    id: number;
    newNickname: string;

    constructor(id: number, newNickname: string) {
        super();
        this.id = id;
        this.newNickname = newNickname;
    }
}

export class UserAvatarChangeMessage extends UserMessage {
    id: number;
    newAvatar: string;

    constructor(id: number, newAvatar: string) {
        super();
        this.id = id;
        this.newAvatar = newAvatar;
    }
}