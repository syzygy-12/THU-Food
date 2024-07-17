import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Button, Box, Typography } from '@mui/material';
import background from '../../images/stlogin1.jpg';  // 导入背景图片

export function UserEntrance({ title }: { title: string }) {
    const history = useHistory();

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
                        {title}
                    </Typography>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => history.push('/user-login')}
                    >
                        登录
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => history.push('/user-register')}
                    >
                        注册
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        color="info"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => history.push('/')}
                    >
                        主菜单
                    </Button>
                </Box>
            </Container>
        </div>
    );
}
