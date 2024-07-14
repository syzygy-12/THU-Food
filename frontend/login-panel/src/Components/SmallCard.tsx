import React, { useState, useRef } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { CardInfo } from 'Plugins/Models/Entry';
import { ImageComponent2, ImageComponent3 } from './Image'

interface SmallCardProps {
    cardInfo: CardInfo;
    handleNavigation: (url: string) => void;
}

const SmallCardWidth = '320px';
const SmallCardHeight = '72px';

const SmallCard: React.FC<SmallCardProps> = ({ cardInfo, handleNavigation }) => {
    const [isHovered, setIsHovered] = useState(false);
    const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (hoverTimeout.current) {
            clearTimeout(hoverTimeout.current);
            hoverTimeout.current = null;
        }
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        hoverTimeout.current = setTimeout(() => {
            setIsHovered(false);
        }, 150); // 等待 150 毫秒后再缩小
    };

    return (
        <Box
            sx={{
                position: 'relative',
                zIndex: isHovered ? 2 : 1, // 使其置于顶层
                width: SmallCardWidth,
                height: SmallCardHeight,
                transition: 'transform 0.3s ease-in-out, z-index 0.3s ease-in-out',
                transform: isHovered ? 'scale(1.1)' : 'scale(1)', // 放大比例
                marginTop: '8px'
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Card
                onClick={() => handleNavigation(`/explore/${cardInfo.id}`)}
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.35)', // 半透明背景颜色
                    cursor: 'pointer',
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    borderRadius: '8px',
                    top: 0,
                    left: 0,
                }}
            >
                <CardContent
                    sx={{
                        paddingTop: '0px',
                        paddingLeft: '12px',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        height: '100%',
                    }}
                >
                    <Typography sx={{ fontFamily: 'SimHei, sans-serif', fontSize: '16px', margin: 0, width: '200px', paddingTop: '8px',}}>
                        名称: {cardInfo.name} ID: {cardInfo.id}
                    </Typography>
                    <ImageComponent3
                        imageName={cardInfo.image}
                        height='72px'
                        width='108px'
                    />
                </CardContent>
            </Card>
        </Box>
    );
};

export default SmallCard;
