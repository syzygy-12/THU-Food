import { API } from "Plugins/CommonUtils/API";

export abstract class ImageMessage extends API {
    override serviceName:string="Image"
}

export class ImageTestMessage extends ImageMessage {
    id :number
    constructor(id : number) {
        super();
        this.id = id;
        Object.defineProperty(this, 'type', {
            value: 'ImageTestMessage',
            writable: false
        });
    }
}

export class ImageCreateMessage extends ImageMessage {
    base64: String
    constructor(base64: String) {
        super();
        this.base64 = base64;
        Object.defineProperty(this, 'type', {
            value: 'ImageCreateMessage',
            writable: false
        });
    }
}

export class ImageIdQueryCreateMessage extends ImageMessage {
    id :number
    constructor(id : number) {
        super();
        this.id = id;
        Object.defineProperty(this, 'type', {
            value: 'ImageIdQueryCreateMessage',
            writable: false
        });
    }
}