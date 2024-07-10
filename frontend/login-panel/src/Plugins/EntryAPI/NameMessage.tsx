import { EntryMessage } from 'Plugins/EntryAPI/EntryMessage';

export class NameQueryMessage extends EntryMessage {

    id : number

    constructor(id : number) {
        super();
        this.id = id;
        Object.defineProperty(this, 'type', {
            value: 'NameQueryMessage',
            writable: false
        });
    }
}