import { sendPostRequest } from 'Plugins/CommonUtils/PostRequest'
import { ArticleModifyMessage, ArticleQueryMessage } from 'Plugins/EntryAPI/ArticleMessage'

export const getArticle = async (id: number): Promise<String> => {
    return await sendPostRequest(new ArticleQueryMessage(id)); // 直接返回结果
}

export const changeArticle = async (id: number, newArticle: string): Promise<boolean> => {
    return await sendPostRequest(new ArticleModifyMessage(id, newArticle));
}
