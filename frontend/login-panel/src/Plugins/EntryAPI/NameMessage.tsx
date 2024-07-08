import { EntryMessage } from 'Plugins/EntryAPI/EntryMessage';

export class NameIdQueryMessage extends EntryMessage {

    id : number

    constructor(id : number) {
        super();
        this.id = id;
        Object.defineProperty(this, 'type', {
            value: 'NameIdQueryMessage',
            writable: false
        });
    }
}