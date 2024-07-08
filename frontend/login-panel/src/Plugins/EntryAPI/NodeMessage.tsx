import { EntryMessage } from 'Plugins/EntryAPI/EntryMessage';

export class NodeIdQueryMessage extends EntryMessage {

    id : number

    constructor(id : number) {
        super();
        this.id = id;
        Object.defineProperty(this, 'type', {
            value: 'NodeIdQueryMessage',
            writable: false
        });
    }
}

export class NodeModifyMessage extends EntryMessage {

    id: number;
    info: string;

    constructor(id: number, info: string) {
        super();
        this.id = id;
        this.info = info;
        Object.defineProperty(this, 'type', {
            value: 'NodeModifyMessage',
            writable: false
        });
    }
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



