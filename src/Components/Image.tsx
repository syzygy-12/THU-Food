import React, { useState, useEffect } from 'react';

interface ImageComponentProps {
    imageName: string;
    width: string;
    height: string;
    opacity?: number; // 添加透明度属性，默认为 0
}

const imageURL: string = "http://localhost:10000/images/"

export const ImageComponent: React.FC<ImageComponentProps> = ({ imageName, width, height, opacity = 100 }) => {
    return (
        <img
            src={imageURL + `${imageName}.jpg`}
            alt={imageName}
            style={{
                width,
                height,
                objectFit: 'cover',
                objectPosition: 'center',
                opacity: opacity / 100 // 将透明度从百分比转换为小数
            }}
        />
    );
};

export const ImageComponent2: React.FC<ImageComponentProps> = ({ imageName, width, height, opacity = 100 }) => {
    const [imageSrc, setImageSrc] = useState<string>(`${imageURL}${imageName}-low.jpg`);

    useEffect(() => {
        const highResImage = new Image();
        highResImage.src = `${imageURL}${imageName}-high.jpg`;
        highResImage.onload = () => {
            setImageSrc(`${imageURL}${imageName}-high.jpg`);
        };
    }, [imageName]);

    return (
        <img
            src={imageSrc}
            alt={imageName}
            style={{
                width,
                height,
                objectFit: 'cover',
                objectPosition: 'center',
                opacity: opacity / 100 // 将透明度从百分比转换为小数
            }}
        />
    );
};

export const ImageComponent3: React.FC<ImageComponentProps> = ({ imageName, width, height, opacity = 100 }) => {
    return (
        <img
            src={imageURL + `${imageName}-low.jpg`}
            alt={imageName}
            style={{
                width,
                height,
                objectFit: 'cover',
                objectPosition: 'center',
                opacity: opacity / 100 // 将透明度从百分比转换为小数
            }}
        />
    );
};
