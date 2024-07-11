import React, { useState, useRef } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { CardInfo } from 'Plugins/Models/Entry';

interface SmallCardProps {
    cardInfo: CardInfo;
    handleNavigation: (url: string) => void;
}

const SmallCardWidth = 320;
const SmallCardHeight = 72;

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
                    cursor: 'pointer',
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                }}
            >
                <CardContent
                    sx={{
                        paddingTop: '8px',
                        paddingLeft: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        height: '100%',
                    }}
                >
                    <Typography sx={{ fontFamily: 'SimHei, sans-serif', fontSize: '16px', margin: 0 }}>
                        名称: {cardInfo.name} ID: {cardInfo.id}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default SmallCard;
