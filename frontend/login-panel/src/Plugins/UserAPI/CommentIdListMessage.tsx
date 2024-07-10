import { UserMessage } from "Plugins/UserAPI/UserMessage";

export class CommentIdListQueryMessage extends UserMessage {
    userId: number;
    constructor(userId: number) {
        super();
        this.userId = userId;
        Object.defineProperty(this, 'type', {
            value: 'CommentIdListQueryMessage',
            writable: false
        });
    }
}

export class CommentIdInsertMessage extends UserMessage {
    userId: number;
    newCommentId: number;
    constructor(userId: number, newCommentId: number) {
        super();
        this.userId = userId;
        this.newCommentId = newCommentId;
        Object.defineProperty(this, 'type', {
            value: 'CommentIdInsertMessage',
            writable: false
        });
    }
}