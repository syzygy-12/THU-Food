import { EntryMessage } from 'Plugins/EntryAPI/EntryMessage'

export class CardInfoQueryMessage extends EntryMessage {
    id :number
    constructor(id : number) {
        super();
        this.id = id;
    }
}

export class CardInfoQueryByFatherMessage extends EntryMessage {
    fatherID: number
    constructor(fatherID: number) {
        super();
        this.fatherID = fatherID;
    }
}

export class CardInfoQueryByGrandfatherMessage extends EntryMessage {
    grandfatherID: number
    constructor(grandfatherID: number) {
        super();
        this.grandfatherID = grandfatherID;
    }
}

export class CardInfoQueryByIdListMessage extends EntryMessage {
    idList: number[]
    constructor(idList: number[]) {
        super();
        this.idList = idList;
    }
}

export class CardInfoQueryBySearchMessage extends EntryMessage {
    word: string
    constructor(word: string) {
        super();
        this.word = word;
    }
}

export class NameModifyMessage extends EntryMessage {
    id: number
    newName: string
    constructor(id: number, newName: string) {
        super();
        this.id = id;
        this.newName = newName;
    }
}

export class ImageModifyMessage extends EntryMessage {
    id: number
    newImage: string
    constructor(id: number, newImage: string) {
        super();
        this.id = id;
        this.newImage = newImage;
    }
}

export class IsNewModifyMessage extends EntryMessage {
    id: number
    isNew: boolean
    constructor(id: number, isNew: boolean) {
        super();
        this.id = id;
        this.isNew = isNew;
    }
}

export class IsFoodModifyMessage extends EntryMessage {
    id: number
    isFood: boolean
    constructor(id: number, isFood: boolean) {
        super();
        this.id = id;
        this.isFood = isFood;
    }
}

export class IsHiddenModifyMessage extends EntryMessage {
    id: number
    isHidden: boolean
    constructor(id: number, isHidden: boolean) {
        super();
        this.id = id;
        this.isHidden = isHidden;
    }
}