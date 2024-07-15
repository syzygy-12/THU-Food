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
    }
}

export class StaredObjectIdListQueryMessage extends StarMessage {
    userId : number
    starType : number

    constructor(userId : number, starType : number) {
        super();
        this.userId = userId;
        this.starType  = starType;
    }
}

export class StarTestByUserIdAndObjectIdListMessage extends StarMessage {
    userId : number
    objectIdList: number[]
    starType : number

    constructor(userId : number, objectIdList: number[], starType : number) {
        super();
        this.userId = userId;
        this.objectIdList  = objectIdList;
        this.starType  = starType;
    }
}

