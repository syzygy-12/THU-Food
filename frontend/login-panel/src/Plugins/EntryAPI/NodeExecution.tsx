import { NodeModifyMessage, NodeQueryMessage } from 'Plugins/EntryAPI/NodeMessage';
import { Node } from 'Plugins/Models/Entry';
import { sendPostRequest } from 'Plugins/CommonUtils/PostRequest'
import { createEntry } from 'Plugins/EntryAPI/EntryExecution'

const nodeToJsonString = (node: Node): string => {
    return JSON.stringify(node);
}

const jsonStringToNode = (jsonString: string): Node => {
    const obj = JSON.parse(jsonString);
    return obj as Node;
}

export const getNodeById = async (id: number): Promise<Node | null> => {
    const message = new NodeQueryMessage(id);
    const result = await sendPostRequest(message);
    return jsonStringToNode(result); // 直接返回结果
};

export const modifyNode = async (id: number, newNode: Node): Promise<void> => {
    const message = new NodeModifyMessage(id, nodeToJsonString(newNode));
    await sendPostRequest(message);
}
// 以上是需要发送 message 的前后端接口，以下是前端内部逻辑

export const createSon = async (fatherId: number, fatherNode: Node): Promise<void> => {
    const newId = await createEntry(); // 创建新节点
    const updatedFatherNode = { ...fatherNode, son: [...fatherNode.son, newId] };
    await modifyNode(fatherId, updatedFatherNode);
    await modifyNode(newId, { fatherId, son: []});
}

export const deleteNode = async (sonId: number, fatherId: number): Promise<void> => {
    // 从 fatherNode.son 列表中删除 sonId
    const fatherNode = await getNodeById(fatherId);
    fatherNode.son = fatherNode.son.filter(id => id !== sonId);
    await modifyNode(fatherId, fatherNode);
}
