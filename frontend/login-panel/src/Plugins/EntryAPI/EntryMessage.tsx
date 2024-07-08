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
    constructor() {
        super();
        Object.defineProperty(this, 'type', {
            value: 'EntryCreateMessage',
            writable: false
        });
    }
}