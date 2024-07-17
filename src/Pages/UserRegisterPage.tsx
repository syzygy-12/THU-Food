import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import background from '../../images/stlogin1.jpg';
import { userRegister } from 'Plugins/UserAPI/UserExecution'  // 导入背景图片

export function UserRegister() {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [responseMessage, setResponseMessage] = useState<string | null>(null);
    const [open, setOpen] = useState(false);

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        const result = await userRegister(username, password);
        if (result) {
            setResponseMessage("注册成功！");
            history.push('/');
        } else {
            setResponseMessage("该用户名已经被注册");
            setOpen(true);
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
