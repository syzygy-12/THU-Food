import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import CommentCard from './CommentCard';
import { Comment } from 'Plugins/Models/Comment';

interface CommentListProps {
    comments: Comment[];
    userId: number;
}

const CommentList: React.FC<CommentListProps> = ({ comments, userId }) => {
    return (
        <Box sx={{ marginTop: '16px', width: '100%' }}>

            <Typography variant="h6">评论列表</Typography>

            {comments.map((comment) => (
                <CommentCard comment={comment} userId={userId}/>
            ))}
        </Box>
    );
};

export default CommentList;
