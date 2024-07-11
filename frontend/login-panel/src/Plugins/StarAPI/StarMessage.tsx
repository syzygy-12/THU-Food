import { API } from 'Plugins/CommonUtils/API'

export abstract class StarMessage extends API {
    override serviceName:string="Star"
}

export class StarTestMessage extends StarMessage {
    userId : number
    objectId : number
    starType : number

    constructor(userId : number, objectId : number, starType : number) {
        super();
        this.userId = userId;
        this.objectId = objectId;
        this.starType  = starType;
        Object.defineProperty(this, 'type', {
            value: 'StarTestMessage',
            writable: false
        });
    }
}

export class StarCreateMessage extends StarMessage {
    userId : number
    objectId : number
    starType : number

    constructor(userId : number, objectId : number, starType : number) {
        super();
        this.userId = userId;
        this.objectId = objectId;
        this.starType  = starType;
        Object.defineProperty(this, 'type', {
            value: 'StarCreateMessage',
            writable: false
        });
    }
}

export class StarDeleteMessage extends StarMessage {
    userId : number
    objectId : number
    starType : number

    constructor(userId : number, objectId : number, starType : number) {
        super();
        this.userId = userId;
        this.objectId = objectId;
        this.starType  = starType;
        Object.defineProperty(this, 'type', {
            value: 'StarDeleteMessage',
            writable: false
        });
    }
}

export class StarFlipMessage extends StarMessage {
    userId : number
    objectId : number
    starType : number

    constructor(userId : number, objectId : number, starType : number) {
        super();
        this.userId = userId;
        this.objectId = objectId;
        this.starType  = starType;
        Object.defineProperty(this, 'type', {
            value: 'StarFlipMessage',
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

export class StaredObjectStarCountMessage extends StarMessage {
    objectId : number
    starType : number

    constructor(userId : number, starType : number) {
        super();
        this.objectId = userId;
        this.starType  = starType;
        Object.defineProperty(this, 'type', {
            value: 'StaredObjectStarCountMessage',
            writable: false
        });
    }
}