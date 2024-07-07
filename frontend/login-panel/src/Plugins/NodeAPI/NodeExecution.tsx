import axios, { isAxiosError } from 'axios';
import { API } from 'Plugins/CommonUtils/API';
import { NodeIdQueryMessage } from 'Plugins/NodeAPI/NodeIdQueryMessage';
import { NodeCreateMessage } from 'Plugins/NodeAPI/NodeCreateMessage';
import { NodeModifyMessage } from 'Plugins/NodeAPI/NodeModifyMessage';
import { Entry, createNewEntryAndId, modifyEntry } from 'Plugins/EntryAPI/EntryExecution'

export interface Node {
    id: number;
    fatherId: number;
    son: number[];
    entryId: number;
}

//node只能用来存储树上的节点，而不是general的节点，general的节点应该用json来存储

export function nodeToJsonString(node: Node): string {
    return JSON.stringify(node);
}

export function jsonStringToNode(jsonString: string): Node | null {
    const parsedObject = JSON.parse(jsonString); {
        return parsedObject as Node;
    }
}

export const errorReport = async (error: any) => {
    if (isAxiosError(error)) {
        if (error.response && error.response.data) {
            console.error('Error sending request:', error.response.data);
        } else {
            console.error('Error sending request:', error.message);
        }
    } else {
        console.error('Unexpected error:', error);
    }
}

export const sendPostRequest = async (message: API): Promise<any> => {
    try {
        const response = await axios.post(message.getURL(), JSON.stringify(message), {
            headers: { 'Content-Type': 'application/json' },
        });
        console.log('Response status:', response.status);
        console.log('Response body:', response.data);
        return response.data; // 返回响应数据
    } catch (error) {
        errorReport(error);
    }
};


export const createNewNodeAndId = async (): Promise<number> => {
    try {
        const min = 1;
        const max = 999999999;
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        const emptyNode: Node = {
            id: randomNumber,
            son: [],
            fatherId : undefined,
            entryId : undefined
        }
        const message = new NodeCreateMessage(randomNumber, nodeToJsonString(emptyNode));
        const response = await axios.post(message.getURL(), JSON.stringify(message), {
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.status === 200) {
            console.log('New node ID:', randomNumber);
            return randomNumber;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response && error.response.data) {
            const errorMessage = error.response.data.error || error.response.data;
            if (typeof errorMessage === 'string' && errorMessage.includes("already exists")) {
                return createNewNodeAndId();
            }
        }
        errorReport(error);
    }
};

//这个函数只能用于创建根节点！！！！！
export const createNode = async (id: number, newNode: Node): Promise<void> => {
    try {
        const message = new NodeCreateMessage(id, nodeToJsonString(newNode));
        const response = await axios.post(message.getURL(), JSON.stringify(message), {
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.status === 200) {
            console.log('New node ID:', id);
        }
    } catch (error) {

    }
}

export const handleFetch = async (id: number): Promise<string | null> => {
    const message = new NodeIdQueryMessage(id);
    const result = await sendPostRequest(message);
    return result; // 直接返回结果
};

export const getNodeById = async (id: number): Promise<Node | null> => {
    const result = await handleFetch(id);
    if (result) {
        return jsonStringToNode(result);
    }
    return null;
};

export const modifyNode = async (id: number, newNode: Node): Promise<void> => {
    const message = new NodeModifyMessage(id, nodeToJsonString(newNode));
    await sendPostRequest(message);
}

export const createLinkedNode = async (fatherId: number, fatherNode: Node): Promise<void> => {
    const newId = await createNewNodeAndId();
    fatherNode.son.push(newId);
    await modifyNode(fatherId, fatherNode);
    const newNode = await getNodeById(newId);
    const entryId = await createNewEntryAndId();
    await modifyEntry(entryId, { id: entryId, nodeId: newId, name: "New Entry" });
    newNode.fatherId = fatherId;
    newNode.entryId = entryId;
    await modifyNode(newId,  newNode);
}

export const deleteNode = async (sonId: number, fatherId: number): Promise<void> => {
    // 从 fatherNode.son 列表中删除 sonId
    const fatherNode = await getNodeById(fatherId);
    fatherNode.son = fatherNode.son.filter(id => id !== sonId);
    await modifyNode(fatherId, fatherNode);
}
