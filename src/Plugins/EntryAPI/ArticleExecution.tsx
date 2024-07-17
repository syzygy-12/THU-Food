import { sendPostRequest } from 'Plugins/CommonUtils/PostRequest'
import { ArticleModifyMessage, ArticleQueryMessage } from 'Plugins/EntryAPI/ArticleMessage'

export const getArticle = async (id: number): Promise<string> => {
    return await sendPostRequest(new ArticleQueryMessage(id));
}

export const changeArticle = async (id: number, newArticle: string): Promise<boolean> => {
    return await sendPostRequest(new ArticleModifyMessage(id, newArticle));
}
