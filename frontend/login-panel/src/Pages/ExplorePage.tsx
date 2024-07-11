import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Container, Typography, Box, Grid, Card, CardContent, Toolbar } from '@mui/material';
import { createEntry, deleteEntry, testEntry } from 'Plugins/EntryAPI/EntryExecution'
import { TopBar, TopBarData } from '../Components/TopBar';
import { testStar, createStar, StarType } from 'Plugins/StarAPI/StarExecution';
import { CardInfo } from 'Plugins/Models/Entry'
import { getCardInfo, getCardInfoByFather, getCardInfoByGrandfather } from 'Plugins/EntryAPI/CardInfoExecution'
import { BigCardInfo } from '../Components/BigCard'
import BigCardList, { generateBigCardInfoList } from '../Components/BigCardList'
import background from '../../images/main1.jpg';

interface RouteParams {
    id: string;
}

export function ExplorePage() {
    const params = useParams<RouteParams>();
    const history = useHistory();
    const [cardInfo, setCardInfo] = useState<CardInfo | null>(null);
    const [bigCardInfoList, setBigCardInfoList] = useState<BigCardInfo[]>([]);
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
            const sonCardInfoList = await getCardInfoByFather(currentEntryId);
            const grandsonCardInfoList = await getCardInfoByGrandfather(currentEntryId);
            setBigCardInfoList(generateBigCardInfoList(sonCardInfoList, grandsonCardInfoList))
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
        if (fatherId == 0) console.log("Error: 无法删除根目录！");
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
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <TopBar data={topBarData} />
            <Toolbar />

            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', mt: 6, mb: 2, width: '100%', paddingLeft: 0, paddingRight: 0, boxSizing: 'border-box' }}>
                <Box>
                    <Button variant="contained" onClick={handleCreateAndUpdate} sx={{ flex: 0, ml: 2 }}>创建节点</Button>
                    <Button variant="contained" color="error" onClick={handleDelete} sx={{ flex: 0, ml: 2 }}>删除节点</Button>
                    <Typography sx={{ flex: 0, ml: 2, display: 'inline-block' }}>目前ID: {currentEntryId}  fatherId: {cardInfo.fatherId}</Typography>
                    <Button variant="contained" onClick={() => handleNavigation(`/comment/${currentEntryId}`)} sx={{ flex: 0, ml: 2 }}>介绍</Button>
                    <Button
                        variant="contained"
                        color={isStarred ? 'secondary' : 'primary'}
                        onClick={handleStarToggle}
                        sx={{ ml: 2 }}
                    >
                        {isStarred ? '取消收藏' : '收藏'}
                    </Button>
                </Box>
                <Box sx={{ flexGrow: 1, display: 'flex', width: '100%', paddingLeft: 0, paddingRight: 0, boxSizing: 'border-box' }}>
                    <BigCardList
                        bigCardInfoList={bigCardInfoList}
                        handleNavigation={handleNavigation}
                    />
                </Box>
            </Box>
        </div>
    );
}
