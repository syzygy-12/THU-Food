import { NodeMessage } from 'Plugins/NodeAPI/NodeMessage';

export class NodeCreateMessage extends NodeMessage {

    id : number
    info : string

    constructor(id : number, info : string) {
        super();
        this.id = id;
        this.info = info;
        Object.defineProperty(this, 'type', {
            value: 'NodeCreateMessage',
            writable: false
        });
    }
}

