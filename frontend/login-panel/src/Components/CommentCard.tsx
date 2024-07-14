import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { Comment } from 'Plugins/Models/Comment';

interface CommentCardProps {
    comment: Comment;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
    return (
        <Paper sx={{ padding: '16px', marginBottom: '8px' }}>
    <Typography variant="subtitle1">{comment.userId}</Typography>
        <Typography variant="body2" sx={{ color: '#666' }}>{comment.createdAt}</Typography>
    <Typography variant="body1" sx={{ marginTop: '8px' }}>{comment.content}</Typography>
    </Paper>
);
};

export default CommentCard;
