import { API } from "Plugins/CommonUtils/API";
import { EntryMessage } from 'Plugins/EntryAPI/EntryMessage'

export class CommentIdListQueryMessage extends EntryMessage {
    id :number
    constructor(id : number) {
        super();
        this.id = id;
        Object.defineProperty(this, 'type', {
            value: 'CommentIdListQueryMessage',
            writable: false
        });
    }
}

export class CommentIdInsertMessage extends EntryMessage {
    id :number
    newCommentId :number
    constructor(id : number, newCommentId : number) {
        super();
        this.id = id;
        this.newCommentId = newCommentId;
        Object.defineProperty(this, 'type', {
            value: 'CommentIdInsertMessage',
            writable: false
        });
    }
}