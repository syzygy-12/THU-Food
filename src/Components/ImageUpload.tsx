import React, { useState } from 'react';

interface UploadImageComponentProps {
    onUploadSuccess: (imageName: string) => void;
}

const UploadImageComponent: React.FC<UploadImageComponentProps> = ({ onUploadSuccess }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await fetch('http://localhost:10000/images', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const uploadedImageName = await response.text();
                onUploadSuccess(uploadedImageName);
                alert('Image uploaded successfully!');
            } else {
                alert('Failed to upload image.');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image.');
        }
    };

    return (
        <div>
            <input type="file" accept=".png,.jpg,.jpeg,.gif" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Image</button>
        </div>
    );
};

export default UploadImageComponent;