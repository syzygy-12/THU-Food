import axios, { isAxiosError } from 'axios';
import { API } from 'Plugins/CommonUtils/API';
import { NodeIdQueryMessage } from 'Plugins/NodeAPI/NodeIdQueryMessage';
import { NodeCreateMessage } from 'Plugins/NodeAPI/NodeCreateMessage';
import { NodeModifyMessage } from 'Plugins/NodeAPI/NodeModifyMessage';

const errorReport = async (error: any) => {
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

const sendPostRequest = async (message: API): Promise<any> => {
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

//注意:这里json是被污染的，需要重新modify才能使用，要立即接一个modify！！！
export const createJsonAndId = async (): Promise<number> => {
    try {
        const min = 1;
        const max = 999999999;
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        const json: string = "{}"
        const message = new NodeCreateMessage(randomNumber, json);
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
                return createJsonAndId();
            }
        }
        errorReport(error);
    }
};

export const createJson = async (id: number, json: string): Promise<void> => {
    try {
        const message = new NodeCreateMessage(id, json);
        const response = await axios.post(message.getURL(), JSON.stringify(message), {
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.status === 200) {
            console.log('New node ID:', id);
        }
    } catch (error) {
        errorReport(error);
    }
}

const handleFetch = async (id: number): Promise<string | null> => {
    const message = new NodeIdQueryMessage(id);
    const result = await sendPostRequest(message);
    return result; // 直接返回结果
};

export const getJsonById = async (id: number): Promise<string | null> => {
    const result = await handleFetch(id);
    if (result) {
        return result;
    }
    return null;
};

export const modifyJson = async (id: number, json: string): Promise<void> => {
    const message = new NodeModifyMessage(id, json);
    await sendPostRequest(message);
}

