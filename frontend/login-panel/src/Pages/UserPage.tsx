import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Container, Typography, Box, Grid, Card, CardContent, Toolbar, Avatar, Collapse, Paper } from '@mui/material';
import {
    CommentType,
    queryCommentByUser,
    queryComment,
    testComment,
    queryCommentByIdList,
} from 'Plugins/CommentAPI/CommentExecution'
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

const getLikedCommentsByUser = async (userId: number): Promise<Comment[]> => {
    const likedCommentIds = await queryStaredObjectIdList(userId, StarType.LikeForComment);
    const likedComments: Comment[] = await queryCommentByIdList(likedCommentIds);
    return likedComments;
};


export function UserPage() {
    const history = useHistory();
    const [comments, setComments] = useState<Comment[]>([]);
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [likedComments, setLikedComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [activeSection, setActiveSection] = useState<string | null>(null);

    const username = localStorage.getItem('username') || '';
    const userId = parseInt(localStorage.getItem('userId') || '0', 10);
    const avatarUrl = localStorage.getItem('avatarUrl') || ''; // 假设头像 URL 保存在 localStorage 中
    const isLoggedIn = !!username;

    const fetchComments = async () => {
        if (isLoggedIn) {
            setIsLoading(true);
            const fetchedComments = await queryCommentByUser(userId, CommentType.CommentForEntry);
            setComments(fetchedComments);
            const fetchedFavorites = await getFavoritesByUser(userId);
            setFavorites(fetchedFavorites);
            const fetchedLikedComments = await getLikedCommentsByUser(userId);
            setLikedComments(fetchedLikedComments);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [userId]);

    const handleNavigation = (path: string) => {
        history.push(path);
    };

    const handleButtonClick = (section: string) => {
        if (activeSection === section) {
            setActiveSection(null);
        } else {
            setActiveSection(section);
        }
    };

    const topBarData = new TopBarData('User Comments and Favorites', username, [
        { label: '主页', path: '/home' },
        { label: '用户', path: '/profile' },
        { label: '设置', path: '/settings' }
    ]);

    const commonButtonStyles = {
        flex: 1,
        transition: 'background-color 0.3s ease',
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <TopBar data={topBarData} />
            <Toolbar />
            <Container sx={{ mt: 8, mb: 2 }}>
                {isLoggedIn ? (
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                            <Avatar src={avatarUrl} alt={username} sx={{ width: 56, height: 56, mr: 2 }} />
                            <Typography variant="h4">{username}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                            <Paper sx={{
                                display: 'flex',
                                mb: 0,
                                boxShadow: activeSection ? 3 : 1,
                                transition: 'box-shadow 0.3s ease',
                            }}>
                                <Button
                                    variant="contained"
                                    onClick={() => handleButtonClick('comments')}
                                    sx={{
                                        ...commonButtonStyles,
                                        borderTopRightRadius: 0,
                                        borderBottomRightRadius: activeSection === 'comments' ? 0 : '8px',
                                        marginRight: '2px',
                                        bgcolor: activeSection === 'comments' ? 'primary.light' : 'primary.main',
                                        color: activeSection === 'comments' ? 'primary.contrastText' : 'white',
                                        '&:hover': {
                                            bgcolor: 'primary.light',
                                        },
                                        boxShadow: 'none',
                                    }}
                                >
                                    我的评论
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={() => handleButtonClick('favorites')}
                                    sx={{
                                        ...commonButtonStyles,
                                        borderTopLeftRadius: 0,
                                        borderBottomLeftRadius: activeSection === 'favorites' ? 0 : '8px',
                                        marginLeft: '2px',
                                        bgcolor: activeSection === 'favorites' ? 'secondary.light' : 'secondary.main',
                                        color: activeSection === 'favorites' ? 'secondary.contrastText' : 'white',
                                        '&:hover': {
                                            bgcolor: 'secondary.light',
                                        },
                                        boxShadow: 'none',
                                    }}
                                >
                                    我的收藏
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={() => handleButtonClick('likedComments')}
                                    sx={{
                                        ...commonButtonStyles,
                                        borderTopLeftRadius: 0,
                                        borderBottomLeftRadius: activeSection === 'likedComments' ? 0 : '8px',
                                        marginLeft: '2px',
                                        bgcolor: activeSection === 'likedComments' ? 'success.light' : 'success.main',
                                        color: activeSection === 'likedComments' ? 'success.contrastText' : 'white',
                                        '&:hover': {
                                            bgcolor: 'success.light',
                                        },
                                        boxShadow: 'none',
                                    }}
                                >
                                    我的点赞
                                </Button>
                            </Paper>
                            <Collapse in={activeSection === 'comments'} sx={{ width: '100%' }}>
                                <Box sx={{
                                    p: 2,
                                    bgcolor: 'primary.light',
                                    color: 'primary.contrastText',
                                    borderBottomLeftRadius: '8px',
                                    borderBottomRightRadius: '8px',
                                    boxShadow: 3,
                                    transition: 'background-color 0.3s ease',
                                }}>
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
                                </Box>
                            </Collapse>
                            <Collapse in={activeSection === 'favorites'} sx={{ width: '100%' }}>
                                <Box sx={{
                                    p: 2,
                                    bgcolor: 'secondary.light',
                                    color: 'secondary.contrastText',
                                    borderBottomLeftRadius: '8px',
                                    borderBottomRightRadius: '8px',
                                    boxShadow: 3,
                                    transition: 'background-color 0.3s ease',
                                }}>
                                    <Typography variant="h4" gutterBottom>
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
                                </Box>
                            </Collapse>
                            <Collapse in={activeSection === 'likedComments'} sx={{ width: '100%' }}>
                                <Box sx={{
                                    p: 2,
                                    bgcolor: 'success.light',
                                    color: 'success.contrastText',
                                    borderBottomLeftRadius: '8px',
                                    borderBottomRightRadius: '8px',
                                    boxShadow: 3,
                                    transition: 'background-color 0.3s ease',
                                }}>
                                    <Typography variant="h4" gutterBottom>
                                        {username}的点赞
                                    </Typography>
                                    {isLoading ? (
                                        <Typography>加载中...</Typography>
                                    ) : (
                                        <Grid container spacing={2}>
                                            {likedComments.map((comment) => (
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
                                </Box>
                            </Collapse>
                        </Box>
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
