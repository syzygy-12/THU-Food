import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Grid, Card, CardContent, Toolbar, AppBar } from '@mui/material';
import { deleteNode, getNodeById, createSon } from 'Plugins/EntryAPI/NodeExecution' // 导入封装后的函数
import { Node } from 'Plugins/Models/Entry';
import { testEntry } from 'Plugins/EntryAPI/EntryExecution'
import { SmallCard } from 'Components/SmallCard/SmallCard'

interface RouteParams {
    id: string;
}

export function ExplorePage() {
    const params = useParams<RouteParams>();
    const history = useHistory();
    const [currentNode, setNode] = useState<Node | null>(null);
    const [CardList, setCardList] = useState<SmallCard | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [entryExists, setEntryExists] = useState<boolean>(null);

    const username = localStorage.getItem('username') || '';

    const currentEntryId: number = Number(params.id);

    const fetchData = async () => {
        setIsLoading(true);
        const entryTestResult = await testEntry(currentEntryId)// 开始加载
        setEntryExists(entryTestResult);
        if (entryTestResult)
            setNode(await getNodeById(currentEntryId));
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [currentEntryId]);

    useEffect(() => {
    }, [currentNode]);

    const handleNavigation = (path: string) => {
        history.push(path);
    };

    const handleCreateAndUpdate = async (event: React.FormEvent) => {
        event.preventDefault();
        await createSon(currentEntryId, currentNode);
        fetchData();
    };

    const handleDelete = async () => {
        const fatherId = currentNode.fatherId;
        if (fatherId != 0) {
            await deleteNode(currentEntryId, fatherId);
            history.push(`/explore/${fatherId}`); // 重定向到父节点页面
        } else {
            console.log("Error: 无法删除根目录！");
        }
    };

    if (isLoading)
        return <div>Loading...</div>; // 在加载期间显示的内容

    if (!entryExists)
        return <div>页面不存在!</div>; // 如果节点不存在，则显示错误信息

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="fixed">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                        <Typography variant="h6" component="div" sx={{ marginRight: 2 }}>
                            THU Food
                        </Typography>
                        <Button color="inherit" onClick={() => handleNavigation('/home')}>主页</Button>
                        <Button color="inherit" onClick={() => handleNavigation('/profile')}>用户</Button>
                        <Button color="inherit" onClick={() => handleNavigation('/settings')}>设置</Button>
                    </Box>
                    <TextField
                        placeholder="搜索"
                        variant="outlined"
                        size="small"
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: 1,
                            marginRight: 2,
                        }}
                    />
                    <Typography variant="h6" component="div">
                        欢迎 {username}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Toolbar /> {/* 用于占位，使内容不被顶栏遮挡 */}

            <Container sx={{ mt: 8, mb: 2 }}>
                <Button variant="contained" onClick={handleCreateAndUpdate} sx={{ ml: 2 }}>创建节点</Button>
                <Button variant="contained" color="error" onClick={handleDelete} sx={{ ml: 2 }}>删除节点</Button>
                <>目前ID: {currentEntryId}  </>

                <Button variant="contained" onClick={() => handleNavigation(`/info/${currentEntryId}`) }>介绍</Button>
                <Grid container spacing={2} sx={{ mt: 4 }}>
                    {currentNode.son.map((sonNode) => (
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
