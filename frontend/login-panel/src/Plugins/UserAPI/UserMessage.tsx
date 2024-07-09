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