import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Container, Typography, Box, Grid, Card, CardContent, Toolbar } from '@mui/material';
import { deleteNode, getNodeById, createSon } from 'Plugins/EntryAPI/NodeExecution';
import { Node } from 'Plugins/Models/Entry';
import { testEntry } from 'Plugins/EntryAPI/EntryExecution';
import { TopBar, TopBarData } from '../Components/TopBar';
import { testStar, createStar, StarType } from 'Plugins/StarAPI/StarExecution';

interface RouteParams {
    id: string;
}

export function ExplorePage() {
    const params = useParams<RouteParams>();
    const history = useHistory();
    const [currentNode, setNode] = useState<Node | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [entryExists, setEntryExists] = useState<boolean>(null);
    const [isStarred, setIsStarred] = useState<boolean>(false);

    const username = localStorage.getItem('username') || '';
    const userId = parseInt(localStorage.getItem('userId') || '0', 10);
    const currentEntryId: number = Number(params.id);

    const fetchData = async () => {
        setIsLoading(true);
        const entryTestResult = await testEntry(currentEntryId);
        setEntryExists(entryTestResult);
        if (entryTestResult) {
            const node = await getNodeById(currentEntryId);
            setNode(node);
            // Fetch star status from API
            const starStatus = await testStar(userId, currentEntryId, StarType.StarForEntry);
            setIsStarred(Boolean(starStatus)); // Convert to boolean
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [currentEntryId]);

    const handleNavigation = (path: string) => {
        history.push(path);
    };

    const handleCreateAndUpdate = async (event: React.FormEvent) => {
        event.preventDefault();
        await createSon(currentEntryId, currentNode);
        fetchData();
    };

    const handleDelete = async () => {
        const fatherId = currentNode?.fatherId;
        if (fatherId && fatherId !== 0) {
            await deleteNode(currentEntryId, fatherId);
            history.push(`/explore/${fatherId}`);
        } else {
            console.log("Error: 无法删除根目录！");
        }
    };

    const handleStarToggle = async () => {
        const newStatus = !isStarred;
        await createStar(userId, currentEntryId, newStatus ? StarType.StarForEntry : -1);
        setIsStarred(newStatus);
    };

    if (isLoading)
        return <div>Loading...</div>;

    if (!entryExists)
        return <div>页面不存在!</div>;

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
                <Button variant="contained" onClick={handleCreateAndUpdate} sx={{ ml: 2 }}>创建节点</Button>
                <Button variant="contained" color="error" onClick={handleDelete} sx={{ ml: 2 }}>删除节点</Button>
                <>目前ID: {currentEntryId}  </>
                <Button variant="contained" onClick={() => handleNavigation(`/comment/${currentEntryId}`)}>介绍</Button>
                <Button
                    variant="contained"
                    color={isStarred ? 'secondary' : 'primary'}
                    onClick={handleStarToggle}
                    sx={{ ml: 2 }}
                >
                    {isStarred ? '取消收藏' : '收藏'}
                </Button>
                <Grid container spacing={2} sx={{ mt: 4 }}>
                    {currentNode?.son.map((sonNode) => (
                        <Grid item xs={12} sm={6} md={4} key={sonNode}>
                            <Card onClick={() => handleNavigation(`/explore/${sonNode}`)} sx={{ cursor: 'pointer' }}>
                                <CardContent>
                                    <Typography variant="h6">ID: {sonNode}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
