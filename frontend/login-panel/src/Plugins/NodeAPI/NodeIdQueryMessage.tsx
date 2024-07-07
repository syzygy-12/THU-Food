import { NodeMessage } from 'Plugins/NodeAPI/NodeMessage';

export class NodeIdQueryMessage extends NodeMessage {

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

