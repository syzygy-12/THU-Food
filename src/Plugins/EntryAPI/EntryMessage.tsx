import { API } from "Plugins/CommonUtils/API";

export abstract class EntryMessage extends API {
    override serviceName:string="Entry"
}

export class EntryTestMessage extends EntryMessage {
    id :number
    constructor(id : number) {
        super();
        this.id = id;
        Object.defineProperty(this, 'type', {
            value: 'EntryTestMessage',
            writable: false
        });
    }
}

export class EntryCreateMessage extends EntryMessage {
    fatherID: number
    grandfatherID: number
    constructor(fatherID: number, grandfatherID : number) {
        super();
        this.fatherID = fatherID;
        this.grandfatherID = grandfatherID;
        Object.defineProperty(this, 'type', {
            value: 'EntryCreateMessage',
            writable: false
        });
    }
}

export class EntryDeleteMessage extends EntryMessage {
    id: number
    constructor(id: number) {
        super();
        this.id = id;
        Object.defineProperty(this, 'type', {
            value: 'EntryDeleteMessage',
            writable: false
        });
    }
}