import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import SmallCardList from './SmallCardList';
import { useHistory } from 'react-router-dom';
import { CardInfo } from 'Plugins/Models/Entry';

export interface BigCardInfo {
    cardInfo: CardInfo;
    smallCardInfoList: CardInfo[];
}

interface BigCardProps {
    bigCardInfo: BigCardInfo;
    handleNavigation: (url: string) => void;
}

const BigCardWidth = 336;

const BigCard: React.FC<BigCardProps> = ({ bigCardInfo, handleNavigation }) => {
    const history = useHistory();
    const { cardInfo, smallCardInfoList } = bigCardInfo;

    const handleCardHeadClick = () => {
        history.push(`/explore/${cardInfo.id}`);
    };

    return (
        <Card
            sx={{
                width: BigCardWidth,
                paddingLeft: '8px',
                paddingRight: '8px',
                paddingBottom: '8px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                overflow: 'visible', // 允许子元素溢出
                maxHeight: 'calc(100vh - 220px)', // 最大高度控制在屏幕范围内，减去一些偏移量
                backgroundColor: '#f0f0f0', // 略微加深的背景颜色
                position: 'relative', // 允许子元素绝对定位
            }}
        >
            <CardContent
                onClick={handleCardHeadClick}
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    cursor: 'pointer', // 添加鼠标指针变化
                    position: 'relative',
                    overflow: 'visible', // 允许子元素溢出
                }}
            >
                <Typography sx={{ fontFamily: 'SimHei, sans-serif', fontSize: '18px', marginBottom: '16px' }}>
                    名称: {cardInfo.name} ID: {cardInfo.id}
                </Typography>
            </CardContent>

            <Box
                sx={{
                    overflowY: 'auto',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center', // 水平居中
                    paddingLeft: '20px',
                    paddingRight: '20px',
                    marginLeft: '20px',
                    marginRight: '20px',
                    flexGrow: 1,
                    position: 'relative', // 允许子元素绝对定位
                }}
                className="custom-scrollbar"
            >
                <SmallCardList cardInfoList={smallCardInfoList} handleNavigation={handleNavigation} />
            </Box>
        </Card>
    );
};

export default BigCard;
