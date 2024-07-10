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

export class ContentModifyMessage extends CommentMessage {
    id: number;
    content: string;
    constructor(id: number, content: string) {
        super()
        this.id = id;
        this.content = content;
    }
}

export class CommentTestMessage extends CommentMessage {
    id: number;
    constructor(id: number) {
        super()
        this.id = id;
        Object.defineProperty(this, 'type', {
            value: 'CommentTestMessage',
            writable: false
        });
    }
}

export class CommentQueryMessage extends CommentMessage {
    id: number;
    constructor(id: number) {
        super()
        this.id = id;
        Object.defineProperty(this, 'type', {
            value: 'CommentQueryMessage',
            writable: false
        });
    }
}

export class ContentIdQueryMessage extends CommentMessage {
    id: number;
    constructor(id: number) {
        super()
        this.id = id;
    }
}

export class EntryIdQueryMessage extends CommentMessage {
    id: number;
    constructor(id: number) {
        super()
        this.id = id;
    }
}

export class UserIdQueryMessage extends CommentMessage {
    id: number;
    constructor(id: number) {
        super()
        this.id = id;
    }
}