import { UserMessage } from 'Plugins/UserAPI/UserMessage'

export class UserRegisterMessage extends UserMessage {
    userName: string;
    password: string;
    authority: number;

    constructor(userName: string, password: string, authority: number) {
        super();
        this.userName = userName;
        this.password = password;
        this.authority = authority;
    }
}
