import React, { useState, useEffect, SyntheticEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Container, Typography, Box, Toolbar } from '@mui/material';

import { TopBar, TopBarData } from '../Components/TopBar';
import InfoPanel from '../Components/InfoPanel';
import { CardInfo } from 'Plugins/Models/Entry';
import { testEntry } from 'Plugins/EntryAPI/EntryExecution';
import { getCardInfo } from 'Plugins/EntryAPI/CardInfoExecution';
import { StarType, testStar, flipStar } from 'Plugins/StarAPI/StarExecution';
import {
    CommentType,
    flipScoreHistogram,
    queryComment,
    testComment,
} from 'Plugins/CommentAPI/CommentExecution';

interface RouteParams {
    id: string;
}

export function InfoPage() {
    const params = useParams<RouteParams>();
    const history = useHistory();
    const [cardInfo, setCardInfo] = useState<CardInfo | null>(null);
    const [entryExists, setEntryExists] = useState<boolean>(null);
    const [isStarred, setIsStarred] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const [scoreCommentId, setScoreCommentId] = useState<number>(0);

    const username = localStorage.getItem('username') || '';
    const userId = parseInt(localStorage.getItem('userId') || '0', 10);
    const currentEntryId: number = Number(params.id);
    console.log('currentEntryId', currentEntryId);

    const fetchData = async () => {
        const entryTestResult = await testEntry(currentEntryId);
        setEntryExists(entryTestResult);
        if (entryTestResult) {
            const [cardInfo, isStarred, isScored] = await Promise.all([
                getCardInfo(currentEntryId),
                testStar(userId, currentEntryId, StarType.StarForEntry),
                testComment(userId, currentEntryId, CommentType.ScoreForEntry),
            ]);
            if (isScored) {
                const score = await queryComment(userId, currentEntryId, CommentType.ScoreForEntry);
                setScore(Number(score.content) + 1);
                setScoreCommentId(score.id);
            } else {
                setScore(0);
                setScoreCommentId(0);
            }
            setCardInfo(cardInfo);
            setIsStarred(isStarred);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentEntryId]);

    const handleNavigation = (path: string) => {
        history.push(path);
    };

    const handleToggleStar = async () => {
        await flipStar(userId, currentEntryId, StarType.StarForEntry);
        setIsStarred(!isStarred);
    };

    const handleScoreChange = async (event: SyntheticEvent<Element, Event>, value: number) => {
        if (score === 0) {
            await flipScoreHistogram(value - 1, userId, currentEntryId);
            setScore(value);
        } else {
            await flipScoreHistogram(score - 1, userId, currentEntryId);
            await flipScoreHistogram(value - 1, userId, currentEntryId);
            setScore(value);
        }
    };

    const handleNavigateToAdminPage = () => {
        history.push(`/admin/${currentEntryId}`);
    };

    const topBarData = new TopBarData('THU Food', username, [
        { label: '主页', path: '/home' },
        { label: '用户', path: '/profile' },
        { label: '设置', path: '/settings' },
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
        <Box
            sx={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
            }}
        >
            <TopBar data={topBarData} />
            <Toolbar />
            <InfoPanel
                cardInfo={cardInfo}
                handleNavigation={handleNavigation}
                handleToggleStar={handleToggleStar}
                isStarred={isStarred}
                score={score}
                handleScoreChange={handleScoreChange}
            />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '30%',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >

            </Box>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleNavigateToAdminPage}
            >
                Go to Admin Page
            </Button>
        </Box>
    );
}

export default InfoPage;
