import { EntryMessage } from 'Plugins/EntryAPI/EntryMessage'

export class CardInfoQueryMessage extends EntryMessage {
    id :number
    constructor(id : number) {
        super();
        this.id = id;
        Object.defineProperty(this, 'type', {
            value: 'CardInfoQueryMessage',
            writable: false
        });
    }
}

export class CardInfoQueryByFatherMessage extends EntryMessage {
    fatherId: number
    constructor(fatherId: number) {
        super();
        this.fatherId = fatherId;
        Object.defineProperty(this, 'type', {
            value: 'CardInfoQueryByFatherMessage',
            writable: false
        });
    }
}

export class CardInfoQueryByGrandfatherMessage extends EntryMessage {
    grandfatherId: number
    constructor(grandfatherId: number) {
        super();
        this.grandfatherId = grandfatherId;
        Object.defineProperty(this, 'type', {
            value: 'CardInfoQueryByGrandfatherMessage',
            writable: false
        });
    }
}

export class CardInfoQueryByIdListMessage extends EntryMessage {
    idList: number[]
    constructor(idList: number[]) {
        super();
        this.idList = idList;
        Object.defineProperty(this, 'type', {
            value: 'CardInfoQueryByIdListMessage',
            writable: false
        });
    }
}