import { EntryMessage } from 'Plugins/EntryAPI/EntryMessage'

export class ArticleQueryMessage extends EntryMessage {
    id :number
    constructor(id : number) {
        super();
        this.id = id;
    }
}

export class ArticleModifyMessage extends EntryMessage {
    id: number
    newArticle: String
    constructor(id: number, newArticle: String) {
        super();
        this.id = id;
        this.newArticle = newArticle;
    }
}