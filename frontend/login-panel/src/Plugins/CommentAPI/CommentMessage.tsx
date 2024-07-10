import { API } from "Plugins/CommonUtils/API";

export abstract class CommentMessage extends API {
    override serviceName:string="Comment"
}

export class CommentCreateMessage extends CommentMessage {
    content: string;
    userId: number;
    entryId: number;
    constructor(content: string, userId: number, entryId: number) {
        super()
        this.content = content;
        this.userId = userId;
        this.entryId = entryId;
        Object.defineProperty(this, 'type', {
            value: 'CommentCreateMessage',
            writable: false
        });
    }
}

export class CommentDeleteMessage extends CommentMessage {
    id: number;
    constructor(id: number) {
        super()
        this.id = id;
        Object.defineProperty(this, 'type', {
            value: 'CommentDeleteMessage',
            writable: false
        });
    }
}

export class CommentQueryByEntryMessage extends CommentMessage {
    entryId: number;
    constructor(entryId: number) {
        super()
        this.entryId = entryId;
        Object.defineProperty(this, 'type', {
            value: 'CommentQueryByEntryMessage',
            writable: false
        });
    }
}

export class CommentQueryByUserMessage extends CommentMessage {
    userId: number;
    constructor(userId: number) {
        super()
        this.userId = userId;
        Object.defineProperty(this, 'type', {
            value: 'CommentQueryByUserMessage',
            writable: false
        });
    }
}