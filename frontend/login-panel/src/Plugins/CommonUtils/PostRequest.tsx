import axios from 'axios'
import { API } from 'Plugins/CommonUtils/API'

function handleErrorResponse(error: any)  {
    if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
            const errorMessage = error.response.data.error || error.response.data;
            if (typeof errorMessage === 'string') {
                throw errorMessage;
            } else {
                console.log(`Error: ${JSON.stringify(errorMessage)}`);
            }
        } else {
            console.log(`Error: ${error.message}`);
        }
    } else {
        console.log('Unexpected error occurred.');
    }
}

export const sendPostRequest = async (message: API): Promise<any> => {
    try {
        const token = localStorage.getItem('token') || '';
        const messageWithToken = {
            ...message,
            token: token
        };
        const response = await axios.post(message.getURL(), JSON.stringify(messageWithToken), {
            headers: { 'Content-Type': 'application/json' },
        });
        console.log('Response status:', response.status);
        console.log('Response body:', response.data);
        return response.data; // 返回响应数据
    } catch (error) {
        handleErrorResponse(error);
    }
};