import React, { useState } from 'react';
import { Box, Typography, Paper, IconButton, Button } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { Comment } from 'Plugins/Models/Comment';
import { formatDistanceToNow } from 'date-fns';
import { flipStar, StarType } from 'Plugins/StarAPI/StarExecution';
import { ImageComponent2 } from './Image';

interface CommentCardProps {
    comment: Comment;
    userId: number;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment, userId }) => {
    const [isLiked, setIsLiked] = useState<boolean>(comment.liked);
    const [likeCount, setLikeCount] = useState<number>(comment.likes);

    const handleLikeToggle = async () => {
        const newIsLiked = await flipStar(userId, comment.id, StarType.LikeForComment);
        setIsLiked(newIsLiked);
        const count = newIsLiked ? likeCount + 1 : likeCount - 1;
        setLikeCount(count);
    };

    return (
        <Paper sx={{ padding: '16px', marginBottom: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', maxWidth: '600px', width: '100%', margin: '0 auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <Box
                    sx={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        marginRight: '8px',
                    }}
                >
                    <ImageComponent2 imageName={comment.userInfo?.avatar} width="48px" height="48px" />
                </Box>
                <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', display: 'inline-block', width: 'auto' }}>
                        {comment.userInfo?.nickname || comment.userId}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#999', display: 'block', width: 'auto' }}>
                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </Typography>
                </Box>
            </Box>
            <Typography variant="body1" sx={{ marginTop: '8px', display: 'inline-block', width: 'auto', wordWrap: 'break-word' }}>
                {comment.content}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                <IconButton onClick={handleLikeToggle}>
                    {isLiked ? <ThumbUpIcon color="primary" /> : <ThumbUpOutlinedIcon />}
                </IconButton>
                <Typography variant="body2" sx={{ marginLeft: '8px' }}>
                    {likeCount}
                </Typography>
                {comment.userId === userId && (
                    <Button
                        variant="contained"
                        color="error"
                        sx={{ mt: 2 }}
                    >
                        Delete
                    </Button>
                )}
            </Box>
        </Paper>
    );
};

export default CommentCard;
