import React, { useState, useEffect } from 'react';
import axios, { isAxiosError } from 'axios';
import { useHistory } from 'react-router-dom';
import { Container, Button, Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import { API } from 'Plugins/CommonUtils/API';
import background from '../../images/main1.jpg';  // 导入背景图片

export function Main() {
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
            <Container component="main" maxWidth="md" sx={{
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
                        欢迎
                    </Typography>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => history.push('/user-entrance')}
                    >
                        我是用户
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => history.push('/home')}
                    >
                        我是游客
                    </Button>

                </Box>
            </Container>
        </div>
    );
}
