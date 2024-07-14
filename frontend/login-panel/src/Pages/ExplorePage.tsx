import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Box, Toolbar} from '@mui/material'
import { createEntry, deleteEntry, testEntry } from 'Plugins/EntryAPI/EntryExecution'
import { TopBar, TopBarData } from '../Components/TopBar'
import { flipStar, StarType, testStar } from 'Plugins/StarAPI/StarExecution'
import { CardInfo } from 'Plugins/Models/Entry'
import { getCardInfo, getCardInfoByFather, getCardInfoByGrandfather } from 'Plugins/EntryAPI/CardInfoExecution'
import background from '../../images/main1.jpg'
import ExplorePanel from '../Components/ExplorePanel'

interface RouteParams {
    id: string;
}

export function ExplorePage() {
    const params = useParams<RouteParams>();
    const history = useHistory();
    const [cardInfo, setCardInfo] = useState<CardInfo | null>(null);
    const [sonCardInfoList, setSonCardInfoList] = useState<CardInfo[]>([]);
    const [grandsonCardInfoList, setGrandsonCardInfoList] = useState<CardInfo[] >([]);
    const [entryExists, setEntryExists] = useState<boolean>(null);
    const [isStarred, setIsStarred] = useState<boolean>(false);

    const username = localStorage.getItem('username') || '';
    const userId = parseInt(localStorage.getItem('userId') || '0', 10);
    const currentEntryId: number = Number(params.id);

    const fetchData = async () => {
        const entryTestResult = await testEntry(currentEntryId);
        setEntryExists(entryTestResult);
        if (entryTestResult) {
            const [cardInfo, sonCardInfoList, grandsonCardInfoList, isStarred] = await Promise.all([
                getCardInfo(currentEntryId),
                getCardInfoByFather(currentEntryId),
                getCardInfoByGrandfather(currentEntryId),
                testStar(userId,currentEntryId,StarType.StarForEntry)
            ]);
            setCardInfo(cardInfo);
            setIsStarred(isStarred);
            setSonCardInfoList(sonCardInfoList);
            setGrandsonCardInfoList(grandsonCardInfoList);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentEntryId]);

    const handleNavigation = (path: string) => {
        history.push(path);
    };

    const handleCreateAndUpdate = async () => {
        await createEntry(currentEntryId, cardInfo.fatherID);
        fetchData();
    };

    const handleDelete = async () => {
        const fatherID = cardInfo.fatherID;
        if (fatherID == 0) console.log("Error: 无法删除根目录！");
        else {
            await deleteEntry(currentEntryId);
            history.push(`/explore/${fatherID}`);
        }
    };

    const handleStarToggle = async () => {
        const newIsStarred = await flipStar(userId, currentEntryId, StarType.StarForEntry);
        console.log('New star status:', newIsStarred); // 调试日志
        setIsStarred(newIsStarred);
    };

    const topBarData = new TopBarData('THU Food', username, [
        { label: '主页', path: '/home' },
        { label: '用户', path: '/profile' },
        { label: '设置', path: '/settings' }
    ]);

    if (!entryExists)
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <div>页面不存在!</div>
            </Box>
        );

    if (cardInfo == null)
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

                <div>cardInfo 为空！</div>
            </Box>
        );



    return (
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            maxHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <TopBar data={topBarData} />
            <Box
                sx={{
                    minHeight: '128px',
                    maxHeight: '128px',
                    width: '100%',
                }}
            />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    overflow: 'hidden', // 确保 ExplorePanel 内部不会出现滚动条
                    width: '100%',
                }}
            >
                <ExplorePanel
                    cardInfo={cardInfo}
                    sonCardInfoList={sonCardInfoList}
                    grandsonCardInfoList={grandsonCardInfoList}
                    handleNavigation={handleNavigation}
                    handleCreateAndUpdate={handleCreateAndUpdate}
                    handleDelete={handleDelete}
                    handleStarToggle={handleStarToggle}
                    isStarred={isStarred}
                />
            </Box>
        </div>
    );
}
