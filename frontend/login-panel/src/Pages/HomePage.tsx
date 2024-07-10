import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import {
    Button,
    Typography,
    Box,
    AppBar,
    Toolbar,
    TextField,
} from '@mui/material';
import { TopBar, TopBarData } from '../Components/TopBar'

export function HomePage() {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        // 假设在登录后用户名被存储在本地存储中
        const storedUsername = localStorage.getItem('username');
        const storedUserId = localStorage.getItem('userId');

        if (storedUsername) {
            setUsername(storedUsername);
        }
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    const handleNavigation = (path:string) => {
        history.push(path);
    };

    const topBarData = new TopBarData('THU Food', username, [
        { label: '主页', path: '/home' },
        { label: '用户', path: '/profile' },
        { label: '设置', path: '/settings' }
    ]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <TopBar data={topBarData} />
            <Toolbar /> {/* 用于占位，使内容不被顶栏遮挡 */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <Box sx={{ width: '80%', maxWidth: '1000px' }}>
                    <Box sx={{ mb: 3, backgroundColor: '#f0f0f0', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="h5">滚动广告</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                        <Button variant="contained" color="primary" onClick={() => handleNavigation('/explore/1')}>
                            探索美食
                        </Button>
                        <Button variant="contained" color="secondary" onClick={() => handleNavigation('/recommendations')}>
                            随机推荐
                        </Button>
                        <Button variant="contained" color="secondary" onClick={() => handleNavigation('/test')}>
                            测试界面
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                        <Typography variant="h6">最新食评</Typography>
                        <Typography variant="h6">我的收藏</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Box sx={{ width: '48%', backgroundColor: '#f0f0f0', height: '150px' }} />
                        <Box sx={{ width: '48%', backgroundColor: '#f0f0f0', height: '150px' }} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ width: '48%', backgroundColor: '#f0f0f0', height: '150px' }} />
                        <Box sx={{ width: '48%', backgroundColor: '#f0f0f0', height: '150px' }} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}