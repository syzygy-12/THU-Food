import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { testComment, queryComment, createComment, modifyComment, CommentType } from 'Plugins/CommentAPI/CommentExecution';

interface CommentFormProps {
    userId: number;
    objectId: number;
    onSubmit: (content: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ userId, objectId, onSubmit }) => {
    const [content, setContent] = useState<string>(''); // 确保使用的是 string 类型
    const [isEditing, setIsEditing] = useState<boolean>(false); // 如果有初始内容，则为编辑状态
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchComment = async () => {
            try {
                const commentExists = await testComment(userId, objectId, CommentType.CommentForEntry);
                if (commentExists) {
                    setIsEditing(true);
                    const comment = await queryComment(userId, objectId, CommentType.CommentForEntry);
                    setContent(comment.content);
                } else {
                    setIsEditing(false);
                }
            } catch (error) {
                console.error("Error fetching comment:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchComment();
    }, [userId, objectId]);

    console.log('content : ', content);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await onSubmit(content);
        const CommentExists = await testComment(userId, objectId, CommentType.CommentForEntry);
        if (!CommentExists) {
            setIsEditing(false);
        } else {
            setIsEditing(true);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ marginTop: '16px' }}>
            <Typography variant="h6">{isEditing ? '编辑评论' : '写评论'}</Typography>
            <TextField
                label="评论"
                value={content}
                onChange={(e) => setContent(e.target.value as string)}
                fullWidth
                multiline
                rows={4}
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '8px' }}>
                {isEditing ? '更新评论' : '提交'}
            </Button>
        </Box>
    );
};

export default CommentForm;
