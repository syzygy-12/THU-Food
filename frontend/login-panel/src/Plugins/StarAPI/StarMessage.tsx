import { EntryMessage } from 'Plugins/EntryAPI/EntryMessage';
import { API } from 'Plugins/CommonUtils/API'

export abstract class StarMessage extends API {
    override serviceName:string="Star"
}

export class StarTestMessage extends StarMessage {
    userId : number
    entryId : number
    starType : number

    constructor(userId : number, entryId : number, starType : number) {
        super();
        this.userId = userId;
        this.entryId = entryId;
        this.starType  = starType;
        Object.defineProperty(this, 'type', {
            value: 'StarTestMessage',
            writable: false
        });
    }
}

export class StarCreateMessage extends StarMessage {
    userId : number
    entryId : number
    starType : number

    constructor(userId : number, entryId : number, starType : number) {
        super();
        this.userId = userId;
        this.entryId = entryId;
        this.starType  = starType;
        Object.defineProperty(this, 'type', {
            value: 'StarCreateMessage',
            writable: false
        });
    }
}

export class StarDeleteMessage extends StarMessage {
    userId : number
    entryId : number
    starType : number

    constructor(userId : number, entryId : number, starType : number) {
        super();
        this.userId = userId;
        this.entryId = entryId;
        this.starType  = starType;
        Object.defineProperty(this, 'type', {
            value: 'StarDeleteMessage',
            writable: false
        });
    }
}

export class StaredObjectIdListQueryMessage extends StarMessage {
    userId : number
    starType : number

    constructor(userId : number, starType : number) {
        super();
        this.userId = userId;
        this.starType  = starType;
        Object.defineProperty(this, 'type', {
            value: 'StaredObjectIdListQueryMessage',
            writable: false
        });
    }
}