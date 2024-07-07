import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios, { isAxiosError } from 'axios';
import { API } from 'Plugins/CommonUtils/API';
import { PatientLoginMessage } from 'Plugins/PatientAPI/PatientLoginMessage'; // 引入 PatientLoginMessage
import background from '../../images/cwlogin1.jpg';  // 导入背景图片

export function CanteenLogin() {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [responseMessage, setResponseMessage] = useState<string | null>(null);
    const [open, setOpen] = useState(false);

    const sendPostRequest = async (message: API) => {
        try {
            const response = await axios.post(message.getURL(), JSON.stringify(message), {
                headers: { 'Content-Type': 'application/json' },
            });

            console.log('Response status:', response.status);
            console.log('Response body:', response.data);

            if (response.data === "Valid user") {
                setResponseMessage("Login successful!");
                localStorage.setItem('username', username); // 将用户名存储在本地存储中
                history.push('/home');
            } else if (response.data === "Invalid user") {
                setResponseMessage("Invalid user");
                setOpen(true); // 显示弹窗
            }
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.response && error.response.data) {
                    setResponseMessage(`Error: ${error.response.data.error}`);
                    console.error('Error sending request:', error.response.data);
                } else {
                    setResponseMessage(`Error: ${error.message}`);
                    console.error('Error sending request:', error.message);
                }
            } else {
                setResponseMessage('Unexpected error occurred.');
                console.error('Unexpected error:', error);
            }
        }
    };

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();
        const message = new PatientLoginMessage(username, password); // 使用 PatientLoginMessage
        sendPostRequest(message);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Container component="main" maxWidth="xs" sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                padding: '2rem',
                borderRadius: '8px'
            }}>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        登录
                    </Typography>
                    <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            登录
                        </Button>
                        <Button
                            fullWidth
                            variant="text"
                            color="secondary"
                            onClick={() => history.push('/')}
                        >
                            主菜单
                        </Button>
                    </Box>
                </Box>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"登录失败"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            用户名或密码不正确
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            确定
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </div>
    );
}
