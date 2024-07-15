import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Container, Typography, Box, TextField, Toolbar, Avatar } from '@mui/material';
import { TopBar, TopBarData } from '../Components/TopBar';
import { changeUserPassword, changeUserAvatar, getUserInfo } from 'Plugins/UserAPI/UserExecution';
import UploadImageComponent from '../Components/ImageUpload';
import { ImageComponent2 } from '../Components/Image'

export function SettingPage() {
    const history = useHistory();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [avatar, setAvatar] = useState<string>('');
    const username = localStorage.getItem('username') || '';
    const userId = parseInt(localStorage.getItem('userId') || '0', 10);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const userInfo = await getUserInfo(userId);
            if (userInfo.avatar) {
                setAvatar(userInfo.avatar);
            }
        };
        fetchUserInfo();
    }, [userId]);

    const handlePasswordChange = async () => {
        if (newPassword !== confirmPassword) {
            setErrorMessage('两次输入的密码不一致');
            return;
        }
        const result = await changeUserPassword(userId, currentPassword, newPassword);
        if (result) {
            window.location.reload();
        } else {
            setErrorMessage('密码修改失败');
        }
    };

    const handleUploadSuccess = async (imageName: string) => {
        const avatar = imageName;
        await changeUserAvatar(userId, avatar);
        setAvatar(avatar); // 上传成功后立即更新头像 URL
        //console.log('Updated avatarUrl:', avatarUrl); // 调试信息
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
                    <Box
                        sx={{
                            width: '128px',
                            height: '128px',
                            borderRadius: '50%',
                            overflow: 'hidden'
                        }}
                    >
                        <ImageComponent2 imageName={avatar} width="128px" height="128px" />
                    </Box>
                    <UploadImageComponent onUploadSuccess={handleUploadSuccess} />
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
