import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Grid, Card, CardContent, Toolbar, AppBar } from '@mui/material';

//import { Entry, getEntryById } from 'Plugins/EntryAPI/EntryExecution'

interface RouteParams {
    id: string;
}

export function InfoPage() {
    const params = useParams<RouteParams>();
    const history = useHistory();
    const [currentNode, setNode] = useState<Node | null>(null);
    //const [currenEntry, setEntry] = useState<Entry | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const username = localStorage.getItem('username') || '';

    const currentNodeId: number = Number(params.id);
    console.log("currentNodeId :", currentNodeId)

    // const fetchData = async () => {
    //     setIsLoading(true); // 开始加载
    //     const result = await getNodeById(currentNodeId);
    //     if (!result) {
    //         if (currentNodeId === 0) {
    //             const rootNode: Node = { id: 0, son: [], fatherId: undefined, entryId: undefined};
    //             await createNode(0, rootNode);
    //             setNode(rootNode); // 设置根节点
    //         } else {
    //             console.log("节点不存在！");
    //         }
    //     } else {
    //         setNode(result); // 设置获取到的节点
    //         const entryId = result.entryId;
    //         if (entryId) {
    //             const entry = await getEntryById(entryId);
    //             setEntry(entry);
    //         }
    //     }
    //
    //     setIsLoading(false); // 完成加载
    // };
    //
    // useEffect(() => {
    //     fetchData();
    // }, [currentNodeId]);
    //
    const handleNavigation = (path: string) => {
        history.push(path);
    };
    //
    //
    // if (isLoading)
    //     return <div>Loading...</div>; // 在加载期间显示的内容
    //
    // console.log('currentNodeId:', currentNodeId);
    // console.log('currentNode:', currentNode);

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

            {/*<Container>*/}
            {/*    <Grid container spacing={2}>*/}
            {/*        <Grid item xs={12}>*/}
            {/*            <Card>*/}
            {/*                <CardContent>*/}
            {/*                    <Typography variant="h5" component="div">*/}
            {/*                        条目名称:{currenEntry?.name}*/}
            {/*                    </Typography>*/}
            {/*                    <Typography variant="body1" component="div">*/}
            {/*                        当前id:{currentNode?.id}*/}
            {/*                    </Typography>*/}
            {/*                    <Typography variant="body1" component="div">*/}
            {/*                        父亲id:{currentNode?.fatherId}*/}
            {/*                    </Typography>*/}
            {/*                    <Typography variant="body1" component="div">*/}
            {/*                        儿子id:{currentNode?.son}*/}
            {/*                    </Typography>*/}
            {/*                </CardContent>*/}
            {/*            </Card>*/}
            {/*        </Grid>*/}
            {/*        <Grid item xs={12}>*/}
            {/*            <Button*/}
            {/*                variant="contained"*/}
            {/*                color="primary"*/}
            {/*                onClick={() => handleNavigation(`/explore/${currentNodeId}`)}*/}
            {/*            >*/}
            {/*                返回*/}
            {/*            </Button>*/}
            {/*        </Grid>*/}
            {/*    </Grid>*/}
            {/*</Container>*/}
        </Box>
    );
}
