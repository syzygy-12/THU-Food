import { EntryMessage } from 'Plugins/EntryAPI/EntryMessage';
import { API } from 'Plugins/CommonUtils/API'

export abstract class StarMessage extends API {
    override serviceName:string="Star"
}

export class StaredEntryIdListQueryMessage extends StarMessage {
    userId : number

    constructor(userId : number) {
        super();
        this.userId = userId;
        Object.defineProperty(this, 'type', {
            value: 'StaredEntryIdListQueryMessage',
            writable: false
        });
    }
}

export class StarTestMessage extends StarMessage {
    userId : number
    entryId : number

    constructor(userId : number, entryId : number) {
        super();
        this.userId = userId;
        this.entryId = entryId;
        Object.defineProperty(this, 'type', {
            value: 'StarTestMessage',
            writable: false
        });
    }
}

export class StarCreateMessage extends StarMessage {

    userId : number
    entryId : number

    constructor(userId : number, entryId : number) {
        super();
        this.userId = userId;
        this.entryId = entryId;
        Object.defineProperty(this, 'type', {
            value: 'StarCreateMessage',
            writable: false
        });
    }
}