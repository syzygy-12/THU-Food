import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import {
    Button,
    Typography,
    Box,
    Toolbar,
} from '@mui/material';
import { TopBar, TopBarData } from '../Components/TopBar'
import '../styles.css';

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

    const handleNavigation = (path: string) => {
        history.push(path);
    };

    const topBarData = new TopBarData('THU Food', username, [
        { label: '主页', path: '/home' },
        { label: '用户', path: '/profile' },
        { label: '设置', path: '/settings' }
    ]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F7F7FB' }}>
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
                    <Box sx={{ mb: 3, backgroundColor: '#ffffff', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '15px' }}>
                        <Typography variant="h3" color="#333">Spicy delicious xiatou</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                        <Button variant="contained" color="primary" onClick={() => handleNavigation('/explore/1')} sx={{ padding: '10px 20px', borderRadius: '10px' }}>
                            探索美食
                        </Button>
                        <Button variant="contained" color="secondary" onClick={() => handleNavigation('/recommendations')} sx={{ padding: '10px 20px', borderRadius: '10px' }}>
                            随机推荐
                        </Button>
                        <Button variant="contained" color="secondary" onClick={() => handleNavigation('/test')} sx={{ padding: '10px 20px', borderRadius: '10px' }}>
                            测试界面
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                        <Typography variant="h5" color="#333">最新食评</Typography>
                        <Typography variant="h5" color="#333">我的收藏</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Box sx={{ width: '48%', backgroundColor: '#fff', height: '150px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }} />
                        <Box sx={{ width: '48%', backgroundColor: '#fff', height: '150px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ width: '48%', backgroundColor: '#fff', height: '150px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }} />
                        <Box sx={{ width: '48%', backgroundColor: '#fff', height: '150px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
