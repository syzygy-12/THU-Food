import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Container, Typography, Box, TextField, Toolbar } from '@mui/material';
import { TopBar, TopBarData } from '../Components/TopBar';
import { userPasswordChange } from 'Plugins/UserAPI/UserExecution';

export function SettingPage() {
    const history = useHistory();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const username = localStorage.getItem('username') || '';
    const userId = parseInt(localStorage.getItem('userId') || '0', 10);

    const handlePasswordChange = async () => {
        if (newPassword !== confirmPassword) {
            setErrorMessage('两次输入的密码不一致');
            return;
        }
        // 调用API进行密码修改
        const result = await userPasswordChange(userId, currentPassword, newPassword);
        if (result) {
            window.location.reload();
        } else {
            setErrorMessage('密码修改失败');
        }
    };

    const topBarData = new TopBarData('设置', username, [
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
                    用户设置
                </Typography>
                <Box component="form" sx={{ mt: 3 }}>
                    <TextField
                        label="当前密码"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <TextField
                        label="新密码"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <TextField
                        label="确认新密码"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handlePasswordChange}
                        sx={{ mt: 2 }}
                    >
                        修改密码
                    </Button>
                    {errorMessage && (
                        <Typography color="error" sx={{ mt: 2 }}>
                            {errorMessage}
                        </Typography>
                    )}
                </Box>
            </Container>
        </Box>
    );
}

export default SettingPage;
