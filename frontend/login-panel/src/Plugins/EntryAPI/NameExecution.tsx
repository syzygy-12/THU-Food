import { NameIdQueryMessage } from 'Plugins/EntryAPI/NameMessage';
import { Node } from 'Plugins/Models/Entry';
import { sendPostRequest } from 'Plugins/PostRequest'

export const getNameById = async (id: number): Promise<Node | null> => {
    const message = new NameIdQueryMessage(id);
    return await sendPostRequest(message);
};s
s
