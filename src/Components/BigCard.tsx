import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import SmallCardList from './SmallCardList';
import { useHistory } from 'react-router-dom';
import { CardInfo } from 'Plugins/Models/Entry';
import { ImageComponent2 } from './Image';

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
                paddingBottom: '8px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: '8px',
                overflow: 'visible', // 允许子元素溢出
                maxHeight: 'calc(100vh - 220px)', // 最大高度控制在屏幕范围内，减去一些偏移量
                backgroundColor: 'rgba(255, 255, 255, 0.15)', // 半透明背景颜色
                backdropFilter: 'blur(10px)', // 磨砂玻璃效果
                WebkitBackdropFilter: 'blur(10px)', // 兼容 Safari
                position: 'relative', // 允许子元素绝对定位
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // 边框阴影
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
                    padding: 0,
                    '&:hover .image-box': { // 添加悬停效果
                        border: '2px solid rgba(0, 123, 255, 1)',
                        borderRadius: '8px', // 保持圆角
                    }
                }}
            >
                <Box sx={{
                    marginBottom: '16px',
                    width: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.35)',
                    borderRadius: '8px 8px 0 0',
                }}>
                    <Typography sx={{
                        fontFamily: 'SimHei, sans-serif',
                        fontSize: '18px',
                        margin: '16px',
                        width: '100%',
                    }}>
                        名称: {cardInfo.name} ID: {cardInfo.id}
                    </Typography>
                </Box>
                <Box
                    className="image-box" // 添加类名以便在悬停时修改样式
                    sx={{
                        height: '210px',
                        width: '280px',
                        borderRadius: '8px', // 圆角
                        border: '2px solid transparent',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // 边框阴影
                        overflow: 'hidden', // 确保图像不超出圆角框
                        transition: 'border 0.3s ease-in-out', // 平滑过渡效果
                    }}
                >
                    <ImageComponent2
                        imageName={cardInfo.image}
                        height='100%'
                        width='100%'
                    />
                </Box>
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
