import { API } from "Plugins/CommonUtils/API";
import { queryCommentByObject } from 'Plugins/CommentAPI/CommentExecution'

export abstract class CommentMessage extends API {
    override serviceName:string="Comment"
}

export class CommentCreateMessage extends CommentMessage {
    content: string;
    userId: number;
    entryId: number;
    commentType: number;
    constructor(content: string, userId: number, entryId: number, commentType: number) {
        super()
        this.content = content;
        this.userId = userId;
        this.entryId = entryId;
        this.commentType = commentType;
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

export class CommentQueryByObjectMessage extends CommentMessage {
    entryId: number;
    commentType: number;
    constructor(entryId: number,  commentType: number) {
        super()
        this.entryId = entryId;
        this.commentType = commentType;
        Object.defineProperty(this, 'type', {
            value: 'CommentQueryByObjectMessage',
            writable: false
        });
    }
}

export class CommentQueryByUserMessage extends CommentMessage {
    userId: number;
    commentType: number;
    constructor(userId: number, commentType: number) {
        super()
        this.userId = userId;
        this.commentType = commentType;
        Object.defineProperty(this, 'type', {
            value: 'CommentQueryByUserMessage',
            writable: false
        });
    }
}