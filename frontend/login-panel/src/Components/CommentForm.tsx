import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

interface CommentFormProps {
    onSubmit: (content: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
    const [content, setContent] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (content) {
            onSubmit(content);
            setContent('');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ marginTop: '16px' }}>
            <Typography variant="h6">写评论</Typography>

            <TextField
                label="评论"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                fullWidth
                multiline
                rows={4}
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '8px' }}>
                提交
            </Button>
        </Box>
    );
};

export default CommentForm;
