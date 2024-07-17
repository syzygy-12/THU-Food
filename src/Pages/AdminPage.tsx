import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, Switch, FormControlLabel, Box, TextField, Button } from '@mui/material';
import {
    getCardInfo,
    changeIsNew,
    changeIsFood,
    changeIsHidden,
    changeImage,
    changeName,
} from 'Plugins/EntryAPI/CardInfoExecution';
import { useParams } from 'react-router-dom';
import { CardInfo } from 'Plugins/Models/Entry';
import UploadImageComponent from '../Components/ImageUpload'; // 导入 ImageUploadComponent
import { ImageComponent2 } from '../Components/Image';
import { changeArticle, getArticle } from 'Plugins/EntryAPI/ArticleExecution'
import { TopBar, TopBarData } from '../Components/TopBar' // 导入 ImageComponent

interface RouteParams {
    id: string;
}

export function AdminPage() {
    const params = useParams<RouteParams>();
    const [cardInfo, setCardInfo] = useState<CardInfo | null>(null);
    const [uploadedImageName, setUploadedImageName] = useState<string | null>(null); // 新增状态存储上传的图片名称
    const [newName, setNewName] = useState<string>(''); // 新增状态存储新名称
    const [newArticle, setNewArticle] = useState<string>(''); // 新增状态存储新简介
    const currentEntryId: number = Number(params.id);

    const fetchCardInfo = async () => {
        const fetchedCardInfo = await getCardInfo(currentEntryId);
        setCardInfo(fetchedCardInfo);
        if (fetchedCardInfo) {
            setNewName(fetchedCardInfo.name);
            const article = await getArticle(currentEntryId);
            setNewArticle(article);
        }
    };

    useEffect(() => {
        fetchCardInfo();
    }, [currentEntryId]);

    const handleToggle = async (field: keyof CardInfo) => {
        if (!cardInfo) return;

        const updatedCardInfo = { ...cardInfo, [field]: !cardInfo[field] };
        setCardInfo(updatedCardInfo);

        if (field === 'isNew') {
            await changeIsNew(currentEntryId, updatedCardInfo.isNew);
        } else if (field === 'isFood') {
            await changeIsFood(currentEntryId, updatedCardInfo.isFood);
        } else if (field === 'isHidden') {
            await changeIsHidden(currentEntryId, updatedCardInfo.isHidden);
        }
    };

    const handleUploadSuccess = async (imageName: string) => {
        setUploadedImageName(imageName);
        await changeImage(currentEntryId, imageName);
    };

    const handleNameChange = async () => {
        if (newName && cardInfo) {
            await changeName(currentEntryId, newName);
            setCardInfo({ ...cardInfo, name: newName });
        }
    };

    const handleArticleChange = async () => {
        if (newArticle && cardInfo) {
            await changeArticle(currentEntryId, newArticle);
            setNewArticle(newArticle);
        }
    }

    if (!cardInfo) {
        return <Typography>Loading...</Typography>;
    }

    const username = localStorage.getItem('username') || '';

    const topBarData = new TopBarData('THU Food', username, [
        { label: '主页', path: '/home' },
        { label: '用户', path: '/profile' },
        { label: '设置', path: '/settings' }
    ]);

    return (
        <Container sx={{ mt: 8, mb: 2 }}>
            <TopBar data={topBarData} />
            <Typography variant="h4" gutterBottom>
                节点管理
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} key={cardInfo.id}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">{cardInfo.id}</Typography>
                            <Typography variant="h6">{cardInfo.name}</Typography>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={cardInfo.isFood}
                                        onChange={() => handleToggle('isFood')}
                                        color="primary"
                                    />
                                }
                                label="是否是菜品"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={cardInfo.isHidden}
                                        onChange={() => handleToggle('isHidden')}
                                        color="primary"
                                    />
                                }
                                label="是否隐藏"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={cardInfo.isNew}
                                        onChange={() => handleToggle('isNew')}
                                        color="primary"
                                    />
                                }
                                label="是否是新品"
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
                <Typography variant="h6">上传图片</Typography>
                <UploadImageComponent onUploadSuccess={handleUploadSuccess} /> {/* 添加上传图片组件 */}
                {uploadedImageName && (
                    <ImageComponent2 imageName={uploadedImageName} width="100%" height="auto" />
                )}
            </Box>
            <Box sx={{ mt: 2 }}>
                <TextField
                    label="新名称"
                    variant="outlined"
                    fullWidth
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 1 }}
                    onClick={handleNameChange}
                >
                    更新名称
                </Button>
            </Box>

            <Box sx={{ mt: 2 }}>
                <TextField
                    label="新简介"
                    variant="outlined"
                    fullWidth
                    value={newArticle}
                    onChange={(e) => setNewArticle(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 1 }}
                    onClick={handleArticleChange}
                >
                    更新简介
                </Button>
            </Box>
        </Container>
    );
}

export default AdminPage;
