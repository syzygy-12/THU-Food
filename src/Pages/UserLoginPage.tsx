import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import background from '../../images/stlogin1.jpg'
import { userLogin } from 'Plugins/UserAPI/UserExecution'

export function UserLogin() {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        const result = await userLogin(username, password);
        if (result.valid) {
            localStorage.setItem('username', username); // 将用户名存储在本地存储中
            localStorage.setItem('userId', result.id.toString());
            localStorage.setItem('token', result.token);
            history.push('/home');
        } else if (!result.valid) {
            setOpen(true); // 显示弹窗
        }
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
