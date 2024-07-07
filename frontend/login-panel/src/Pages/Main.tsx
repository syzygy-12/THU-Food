import React, { useState, useEffect } from 'react';
import axios, { isAxiosError } from 'axios';
import { useHistory } from 'react-router-dom';
import { Container, Button, Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import { PatientQueryNameMessage } from 'Plugins/PatientAPI/PatientQueryNameMessage';
import { API } from 'Plugins/CommonUtils/API';
import background from '../../images/main1.jpg';  // 导入背景图片

export function Main() {
    const history = useHistory();
    const [canteenWorkers, setCanteenWorkers] = useState<string[]>([]);

    const sendPostRequest = async (message: API) => {
        const url = `/api/${message.serviceName}/Pati`;
        try {
            const response = await axios.post(message.getURL(), JSON.stringify(message), {
                headers: { 'Content-Type': 'application/json' },
            });
            console.log('Response status:', response.status);
            console.log('Response body:', response.data);
            return response.data;
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.response && error.response.data) {
                    console.error('Error sending request:', error.response.data);
                } else {
                    console.error('Error sending request:', error.message);
                }
            } else {
                console.error('Unexpected error:', error);
            }
        }
    };

    useEffect(() => {
        const fetchCanteenWorkers = async () => {
            const message = new PatientQueryNameMessage();
            const data = await sendPostRequest(message);
            if (data) {
                setCanteenWorkers(data);
            }
        };

        fetchCanteenWorkers();
    }, []);

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
                        onClick={() => history.push('/canteen-worker')}
                    >
                        我是食堂工作者
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => history.push('/student')}
                    >
                        我是学生
                    </Button>

                    {/* 显示已经注册的食堂工作人员用户名 */}
                    <Paper sx={{ marginTop: 4, padding: 2, width: '100%' }}>
                        <Typography variant="h6" component="div" gutterBottom>
                            已注册的食堂工作人员
                        </Typography>
                        <List>
                            {canteenWorkers.map((worker, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={worker} />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Box>
            </Container>
        </div>
    );
}
