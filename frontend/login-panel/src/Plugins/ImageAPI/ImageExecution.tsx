import { ImageCreateMessage, ImageTestMessage } from 'Plugins/ImageAPI/ImageMessage'
import { sendPostRequest } from 'Plugins/PostRequest'

const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                const base64String = reader.result.split(',')[1];
                resolve(base64String);
            } else {
                reject(new Error('FileReader result is not a string'));
            }
        };
        reader.onerror = error => reject(error);
    });
}

export const createImage = async (pngImageFile: File): Promise<number> => {
    const base64Image = await toBase64(pngImageFile);
    const message = new ImageCreateMessage(base64Image as string);
    return await sendPostRequest(message);
}

export const testEntry = async (id: number): Promise<boolean> => {
    const message = new ImageTestMessage(id);
    return await sendPostRequest(message); // 直接返回结果
}
