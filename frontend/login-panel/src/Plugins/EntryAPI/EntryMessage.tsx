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
    fatherId: number
    grandfatherId: number
    constructor(fatherId: number, grandfatherId : number) {
        super();
        this.fatherId = fatherId;
        this.grandfatherId = grandfatherId;
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