import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Toolbar, AppBar } from '@mui/material';
import { getNodeById, modifyNode } from 'Plugins/EntryAPI/NodeExecution'
import { getNameById } from 'Plugins/EntryAPI/NameExecution'
import { createEntry, testEntry } from 'Plugins/EntryAPI/EntryExecution' // 导入封装后的函数

interface RouteParams {
    id: string;
}

export function TestPage() {
    const params = useParams<RouteParams>();
    const history = useHistory();

    const username = localStorage.getItem('username') || '';

    const currentNodeId: number = Number(params.id);
    console.log("currentNodeId :", currentNodeId)


    const handleNavigation = (path: string) => {
        history.push(path);
    };

    const handleClick = async () => {
        const result = await createEntry();
        console.log(result);
    };

    const handleClick2 = async () => {
        const id = 10;
        const checkEntryExists = await testEntry(id);
        if (checkEntryExists) {
            const resultNode = await getNodeById(id);
            console.log(resultNode);
            const resultName = await getNameById(id);
            console.log(resultName);
        } else {
            console.log("Entry does not exist!")
        }
    };

    const handleClick3 = async () => {
        const result = await modifyNode(4, { fatherId: 1, son: [1, 1]});
        console.log(result);
    };


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
                <Button variant="contained" onClick={handleClick} sx={{ ml: 2 }}>
                    创建
                </Button>
                <Button variant="contained" onClick={handleClick2} sx={{ ml: 2 }}>
                    查询
                </Button>
                <Button variant="contained" onClick={handleClick3} sx={{ ml: 2 }}>
                    修改
                </Button>
            </Container>

        </Box>
    );
}
