import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Container, Typography, Box, Grid, Card, CardContent, Toolbar } from '@mui/material';
import { CommentType, queryCommentByUser } from 'Plugins/CommentAPI/CommentExecution'
import { queryStaredObjectIdList, StarType } from 'Plugins/StarAPI/StarExecution';
import { Comment } from 'Plugins/Models/Comment';
import { TopBar, TopBarData } from '../Components/TopBar';

interface Favorite {
    id: number;
}

const getFavoritesByUser = async (userId: number): Promise<Favorite[]> => {
    const favoriteIds = await queryStaredObjectIdList(userId, StarType.StarForEntry);
    return favoriteIds.map((id: number) => ({ id }));
};

export function UserPage() {
    const history = useHistory();
    const [comments, setComments] = useState<Comment[]>([]);
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const username = localStorage.getItem('username') || '';
    const userId = parseInt(localStorage.getItem('userId') || '0', 10);
    const isLoggedIn = !!username;

    const fetchComments = async () => {
        if (isLoggedIn) {
            setIsLoading(true);
            const fetchedComments = await queryCommentByUser(userId, CommentType.CommentForEntry);
            setComments(fetchedComments);
            const fetchedFavorites = await getFavoritesByUser(userId);
            setFavorites(fetchedFavorites);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [userId]);

    const handleNavigation = (path: string) => {
        history.push(path);
    };

    const topBarData = new TopBarData('User Comments and Favorites', username, [
        { label: '主页', path: '/home' },
        { label: '用户', path: '/profile' },
        { label: '设置', path: '/settings' }
    ]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <TopBar data={topBarData} />
            <Toolbar />
            <Container sx={{ mt: 8, mb: 2 }}>
                {isLoggedIn ? (
                    <>
                        <Typography variant="h4" gutterBottom>
                            {username}的评论
                        </Typography>
                        {isLoading ? (
                            <Typography>加载中...</Typography>
                        ) : (
                            <Grid container spacing={2}>
                                {comments.map((comment) => (
                                    <Grid item xs={12} key={comment.id}>
                                        <Card>
                                            <CardContent>
                                                <Typography variant="body1">{comment.content}</Typography>
                                                <Typography variant="caption" color="textSecondary">
                                                    {comment.userId}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                        <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
                            {username}的收藏
                        </Typography>
                        {isLoading ? (
                            <Typography>加载中...</Typography>
                        ) : (
                            <Grid container spacing={2}>
                                {favorites.map((favorite) => (
                                    <Grid item xs={12} sm={6} md={4} key={favorite.id}>
                                        <Card onClick={() => handleNavigation(`/explore/${favorite.id}`)} sx={{ cursor: 'pointer' }}>
                                            <CardContent>
                                                <Typography variant="body1">收藏菜品ID: {favorite.id}</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </>
                ) : (
                    <Typography variant="h6">
                        你是游客，若查看评论请登录
                    </Typography>
                )}
            </Container>
        </Box>
    );
}

export default UserPage;
