import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Typography, Box, Grid, Card, CardContent, Toolbar, TextField } from '@mui/material';
import { CommentType, createComment, deleteComment, queryCommentByObject } from 'Plugins/CommentAPI/CommentExecution'
import { Comment } from 'Plugins/Models/Comment';
import { TopBar, TopBarData } from '../Components/TopBar';

interface RouteParams {
    id: string;
}

export function CommentPage() {
    const params = useParams<RouteParams>();
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const username = localStorage.getItem('username') || '';
    const userId = parseInt(localStorage.getItem('userId') || '0', 10);
    const currentEntryId: number = Number(params.id);

    const fetchComments = async () => {
        setIsLoading(true);
        const fetchedComments = await queryCommentByObject(currentEntryId, CommentType.CommentForEntry);
        setComments(fetchedComments);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchComments();
    }, [currentEntryId]);

    const handleCreateComment = async () => {
        if (newComment.trim()) {
            await createComment(newComment, userId, currentEntryId, CommentType.CommentForEntry);
            setNewComment('');
            fetchComments();
        }
    };

    const handleDeleteComment = async (commentId: number) => {
        const commentToDelete = comments.find(comment => comment.id === commentId);
        if (commentToDelete && commentToDelete.userId === userId) {
            await deleteComment(commentId);
            fetchComments();
        }
    };

    if (isLoading)
        return <div>Loading...</div>;

    const topBarData = new TopBarData('THU Food', username, [
        { label: '主页', path: '/home' },
        { label: '用户', path: '/profile' },
        { label: '设置', path: '/settings' }
    ]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <TopBar data={topBarData} />
            <Toolbar />
            <Container sx={{ mt: 8, mb: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Comments for Entry {currentEntryId}
                </Typography>
                <TextField
                    label="Write a comment"
                    variant="outlined"
                    fullWidth
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" onClick={handleCreateComment} sx={{ mb: 4 }}>
                    Add Comment
                </Button>
                <Grid container spacing={2}>
                    {comments.map((comment) => (
                        <Grid item xs={12} key={comment.id}>
                            <Card>
                                <CardContent sx={{ position: 'relative' }}>
                                    <Typography variant="body1">{comment.content}</Typography>
                                    <Box sx={{ position: 'absolute', bottom: 8, right: 8 }}>
                                        <Typography variant="caption" color="textSecondary">
                                            {comment.userId}
                                        </Typography>
                                    </Box>
                                    {comment.userId === userId && (
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => handleDeleteComment(comment.id)}
                                            sx={{ mt: 2 }}
                                        >
                                            Delete
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}

export default CommentPage;
