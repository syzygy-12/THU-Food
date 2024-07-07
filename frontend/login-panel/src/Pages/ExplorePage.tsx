import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Grid, Card, CardContent, Toolbar, AppBar } from '@mui/material';
import {
    Node,
    getNodeById,
    createNode,
    createLinkedNode,
    deleteNode,
} from 'Plugins/NodeAPI/NodeExecution' // 导入封装后的函数

interface RouteParams {
    id: string;
}

export function ExplorePage() {
    const params = useParams<RouteParams>();
    const history = useHistory();
    const [currentNode, setNode] = useState<Node | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const username = localStorage.getItem('username') || '';

    const currentNodeId: number = Number(params.id);
    console.log("currentNodeId :", currentNodeId)

    const fetchData = async () => {
        setIsLoading(true); // 开始加载
        const result = await getNodeById(currentNodeId);
        if (!result) {
            if (currentNodeId === 0) {
                const rootNode: Node = { id: 0, son: [], fatherId: undefined, entryId: undefined };
                await createNode(0, rootNode);
                setNode(rootNode); // 设置根节点
            } else {
                console.log("节点不存在！");
            }
        } else {
            setNode(result); // 设置获取到的节点
        }
        setIsLoading(false); // 完成加载
    };

    useEffect(() => {
        fetchData();
    }, [currentNodeId]);

    const handleNavigation = (path: string) => {
        history.push(path);
    };

    const handleCreateAndUpdate = async (event: React.FormEvent) => {
        event.preventDefault();
        if (currentNode) {
            await createLinkedNode(currentNodeId, currentNode);
            const updatedNode = await getNodeById(currentNodeId);
            setNode(updatedNode);
        }
    };

    const handleDelete = async () => {
        const fatherId = currentNode?.fatherId;
        if (fatherId != undefined) {
            await deleteNode(currentNodeId, fatherId);
            history.push(`/explore/${fatherId}`); // 重定向到父节点页面
        } else {
            console.log("Error: 无法删除根目录！");
            //setResponseMessage(`Error: 无法删除根目录！`);
        }
    };

    if (isLoading)
        return <div>Loading...</div>; // 在加载期间显示的内容

    console.log('currentNodeId:', currentNodeId);
    console.log('currentNode:', currentNode);

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
                <>目前ID: {currentNodeId}  </>

                <Button variant="contained" onClick={() => handleNavigation(`/info/${currentNodeId}`) }>介绍</Button>
                <Grid container spacing={2} sx={{ mt: 4 }}>
                    {currentNode.son.map((sonNode) => (
                        <Grid item xs={12} sm={6} md={4} key={sonNode}>
                            <Card onClick={() => handleNavigation(`/explore/${sonNode}`)} sx={{ cursor: 'pointer' }}>
                                <CardContent>
                                    <Typography variant="h6">儿子ID: {sonNode}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

        </Box>
    );
}
