import React, { useState, useRef } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { CardInfo } from 'Plugins/Models/Entry';
import { ImageComponent2 } from './Image'

interface SmallCardProps {
    cardInfo: CardInfo;
    handleNavigation: (url: string) => void;
    showPath: boolean
}

const SpecialBigCardWidth = 288;
const SpecialBigCardHeight = 240;

const SpecialiBigCard: React.FC<SmallCardProps> = ({ cardInfo, handleNavigation, showPath = false}) => {
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
        <div className="card" style={{height: SpecialBigCardHeight, width: SpecialBigCardWidth}}>
            <div className="card-cover">
            <Card
                onClick={() => handleNavigation(`/info/${cardInfo.id}`)}
                sx={{
                    cursor: 'pointer',
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    borderRadius: '0px',
                    transition: 'transform 0.3s ease-in-out, z-index 0.3s ease-in-out',
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)', // 放大比例
                    backgroundColor: 'rgba(255, 255, 255, 0)',
                    top: 0,
                    left: 0,
                }}
            >
                <CardContent
                    sx={{
                        padding: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        height: '100%',
                    }}
                >
                    <Box sx={{
                        marginBottom: '16px',
                        width: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        borderRadius: '8px 8px 0 0',
                    }}>
                        {showPath && (
                            <Typography sx={{ fontFamily: 'SimHei, sans-serif', fontSize: '12px', color: 'gray', margin: '8px' }}>
                                {cardInfo.path}
                            </Typography>
                        )}
                        <Typography sx={{ fontFamily: 'SimHei, sans-serif', fontSize: '16px', margin: '16px' }}>
                            {cardInfo.name}
                        </Typography>
                        <ImageComponent2
                            imageName={cardInfo.image}
                            height='100%'
                            width='100%'
                        />
                    </Box>
                </CardContent>
            </Card>
            </div>
        </div>
    );
};

export default SpecialiBigCard;
