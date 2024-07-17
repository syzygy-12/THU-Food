import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Box, Toolbar} from '@mui/material'
import { createEntry, deleteEntry, testEntry } from 'Plugins/EntryAPI/EntryExecution'
import { TopBar, TopBarData } from '../Components/TopBar'
import { flipStar, StarType, testStar } from 'Plugins/StarAPI/StarExecution'
import { CardInfo } from 'Plugins/Models/Entry'
import {
    getCardInfo,
    getCardInfoByFather,
    getCardInfoByGrandfather,
    getCardInfoBySearch,
} from 'Plugins/EntryAPI/CardInfoExecution'
import background from '../../images/main1.jpg'
import ExplorePanel from '../Components/ExplorePanel'
import SpecialBigCardList from '../Components/SpecialBigCardList'

interface RouteParams {
    word: string;
}

export function SearchPage() {
    const params = useParams<RouteParams>();
    const history = useHistory();
    const [cardInfoList, setCardInfoList] = useState<CardInfo[]>([]);

    const username = localStorage.getItem('username') || '';
    const userId = parseInt(localStorage.getItem('userId') || '0', 10);
    const word: string = params.word;

    const fetchData = async () => {
        setCardInfoList(await getCardInfoBySearch(word));
    };

    useEffect(() => {
        fetchData();
    }, [word]);

    const handleNavigation = (path: string) => {
        history.push(path);
    };

    const topBarData = new TopBarData('THU Food', username, [
        { label: '主页', path: '/home' },
        { label: '用户', path: '/profile' },
        { label: '设置', path: '/settings' }
    ]);

    return (
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <TopBar data={topBarData} />
            <Box
                sx={{
                    height: '64px',
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
                    paddingBottom: 0,
                }}
            >
                <SpecialBigCardList
                    cardInfoList={cardInfoList}
                    handleNavigation={handleNavigation}
                    showPath={true}
                />
            </Box>
        </div>
    );
}
