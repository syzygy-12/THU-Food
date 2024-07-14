import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import CommentCard from './CommentCard';
import { Comment } from 'Plugins/Models/Comment';

interface CommentListProps {
    comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
    return (
        <Box sx={{ marginTop: '16px' }}>

            <Typography variant="h6">评论列表</Typography>

            {comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
            ))}
        </Box>
    );
};

export default CommentList;
