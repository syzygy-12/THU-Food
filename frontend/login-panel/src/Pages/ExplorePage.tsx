import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Container, Typography, Box, Grid, Card, CardContent, Toolbar } from '@mui/material';
import { createEntry, deleteEntry, testEntry } from 'Plugins/EntryAPI/EntryExecution'
import { TopBar, TopBarData } from '../Components/TopBar';
import { testStar, createStar, StarType } from 'Plugins/StarAPI/StarExecution';
import { CardInfo } from 'Plugins/Models/Entry'
import { getCardInfo, getCardInfoByFather } from 'Plugins/EntryAPI/CardInfoExecution'
import SmallCardList from '../Components/SmallCardList'

interface RouteParams {
    id: string;
}

export function ExplorePage() {
    const params = useParams<RouteParams>();
    const history = useHistory();
    const [cardInfo, setCardInfo] = useState<CardInfo | null>(null);
    const [sonCardInfoList, setSonCardInfoList] = useState([]);
    const [entryExists, setEntryExists] = useState<boolean>(null);
    const [isStarred, setIsStarred] = useState<boolean>(false);

    const username = localStorage.getItem('username') || '';
    const userId = parseInt(localStorage.getItem('userId') || '0', 10);
    const currentEntryId: number = Number(params.id);

    const fetchData = async () => {
        const entryTestResult = await testEntry(currentEntryId);
        setEntryExists(entryTestResult);
        if (entryTestResult) {
            setCardInfo(await getCardInfo(currentEntryId));
            setSonCardInfoList(await getCardInfoByFather(currentEntryId));
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentEntryId]);

    const handleNavigation = (path: string) => {
        history.push(path);
    };

    const handleCreateAndUpdate = async (event: React.FormEvent) => {
        event.preventDefault();
        await createEntry(currentEntryId, cardInfo.fatherId);
        fetchData();
    };

    const handleDelete = async () => {
        const fatherId = cardInfo.fatherId;
        if (fatherId == 1) console.log("Error: 无法删除根目录！");
        else {
            await deleteEntry(currentEntryId);
            history.push(`/explore/${fatherId}`);
        }
    };

    const handleStarToggle = async () => {
        const newStatus = !isStarred;
        await createStar(userId, currentEntryId, newStatus ? StarType.StarForEntry : -1);
        setIsStarred(newStatus);
    };

    const topBarData = new TopBarData('THU Food', username, [
        { label: '主页', path: '/home' },
        { label: '用户', path: '/profile' },
        { label: '设置', path: '/settings' }
    ]);

    if (!entryExists)
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <TopBar data={topBarData} />
                <Toolbar />

                <div>页面不存在!</div>
            </Box>
        );

    if (cardInfo == null)
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <TopBar data={topBarData} />
                <Toolbar />
            </Box>
        );

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <TopBar data={topBarData} />
            <Toolbar />

            <Container sx={{ mt: 6, mb: 2 }}>
                <Button variant="contained" onClick={handleCreateAndUpdate} sx={{ ml: 2 }}>创建节点</Button>
                <Button variant="contained" color="error" onClick={handleDelete} sx={{ ml: 2 }}>删除节点</Button>
                <>目前ID: {currentEntryId}  fatherId: {cardInfo.fatherId}</>
                <Button variant="contained" onClick={() => handleNavigation(`/comment/${currentEntryId}`)}>介绍</Button>
                <Button
                    variant="contained"
                    color={isStarred ? 'secondary' : 'primary'}
                    onClick={handleStarToggle}
                    sx={{ ml: 2 }}
                >
                    {isStarred ? '取消收藏' : '收藏'}
                </Button>
                <SmallCardList cardInfoList={sonCardInfoList} handleNavigation={handleNavigation} />
            </Container>
        </Box>
    );
}
