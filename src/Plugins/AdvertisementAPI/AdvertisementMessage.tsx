import { API } from "Plugins/CommonUtils/API";
import { queryCommentByObject } from 'Plugins/CommentAPI/CommentExecution'

export abstract class AdvertisementMessage extends API {
    override serviceName:string="Advertisement"
}

export class AdCreateMessage extends AdvertisementMessage {
    constructor() {
        super()
    }
}

export class AdDeleteMessage extends AdvertisementMessage {
    id: number;
    constructor(id: number) {
        super()
        this.id = id;
    }
}

export class AdModifyMessage extends AdvertisementMessage {
    id: number
    entryId: number
    image: string
    constructor(id: number, entryId: number, image: string) {
        super()
        this.id = id;
        this.entryId = entryId;
        this.image = image;
    }
}

export class AdListQueryMessage extends AdvertisementMessage {
    constructor() {
        super()
    }
}