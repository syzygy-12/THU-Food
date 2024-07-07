import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios, { isAxiosError } from 'axios';
import { API } from 'Plugins/CommonUtils/API';
import { RegisterMessage } from 'Plugins/DoctorAPI/RegisterMessage';
import background from '../../images/stlogin1.jpg';  // 导入背景图片

export function StudentRegister() {
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
            if (response.status === 200) {
                // 注册成功后跳转到主菜单
                setResponseMessage("Registration successful!");
                history.push('/');
            }
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.response && error.response.data) {
                    const errorMessage = error.response.data.error || error.response.data;
                    if (typeof errorMessage === 'string' && errorMessage.includes("already registered")) {
                        setResponseMessage("该用户名已经被注册");
                        setOpen(true); // 显示弹窗
                    } else {
                        setResponseMessage(`Error: ${errorMessage}`);
                    }
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

    const handleRegister = (event: React.FormEvent) => {
        event.preventDefault();
        const message = new RegisterMessage(username, password);
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
                        注册
                    </Typography>
                    <Box component="form" onSubmit={handleRegister} sx={{ mt: 1 }}>
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
                            注册
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
                    <DialogTitle id="alert-dialog-title">{"注册失败"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {responseMessage}
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
