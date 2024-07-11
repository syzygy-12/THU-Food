import { API } from "Plugins/CommonUtils/API";
import { queryCommentByObject } from 'Plugins/CommentAPI/CommentExecution'

export abstract class CommentMessage extends API {
    override serviceName:string="Comment"
}

export class CommentCreateMessage extends CommentMessage {
    content: string;
    userId: number;
    objectId: number;
    commentType: number;
    constructor(content: string, userId: number, objectId: number, commentType: number) {
        super()
        this.content = content;
        this.userId = userId;
        this.objectId = objectId;
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

export class CommentModifyMessage extends CommentMessage {
    id: number;
    content: string;
    constructor(id: number, content: string) {
        super()
        this.id = id;
        this.content = content;
        Object.defineProperty(this, 'type', {
            value: 'CommentModifyMessage',
            writable: false
        });
    }
}

export class CommentQueryByObjectMessage extends CommentMessage {
    objectId: number;
    commentType: number;
    constructor(objectId: number,  commentType: number) {
        super()
        this.objectId = objectId;
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

export class CommentLikesQueryMessage extends CommentMessage {
    id: number;
    constructor(id: number) {
        super()
        this.id = id;
        Object.defineProperty(this, 'type', {
            value: 'CommentLikesQueryMessage',
            writable: false
        });
    }
}