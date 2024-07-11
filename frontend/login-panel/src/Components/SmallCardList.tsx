import React, { useRef, useEffect, useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import SmallCard from './SmallCard';
import { CardInfo } from 'Plugins/Models/Entry';

interface SmallCardListProps {
    cardInfoList: CardInfo[];
    handleNavigation: (url: string) => void;
}

const SmallCardList: React.FC<SmallCardListProps> = ({ cardInfoList, handleNavigation }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [hasScrollbar, setHasScrollbar] = useState(false);

    useEffect(() => {
        if (containerRef.current) {
            const { scrollHeight, clientHeight } = containerRef.current;
            setHasScrollbar(scrollHeight > clientHeight);
        }
    }, [cardInfoList]);

    return (
        <Grid container spacing={0} justifyContent="center" sx={{ position: 'relative', overflow: 'visible', maxHeight: 'calc(100vh - 200px)' }} ref={containerRef}>
            <Box sx={{ position: 'relative', marginBottom: '8px', marginTop: '8px' }}>
                {Array.isArray(cardInfoList) &&
                    cardInfoList.map((cardInfo) => (
                        <Grid item key={cardInfo.id} xs={12} sx={{ position: 'relative', overflow: 'visible' }}>
                            <SmallCard cardInfo={cardInfo} handleNavigation={handleNavigation} />
                        </Grid>
                    ))}
            </Box>
            {hasScrollbar && (
                <Typography sx={{ fontFamily: 'SimHei, sans-serif', fontSize: '12px', margin: 0, color: '#999' }}>
                    没有更多了
                </Typography>
            )}
        </Grid>
    );
};

export default SmallCardList;
