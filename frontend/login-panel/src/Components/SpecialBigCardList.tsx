import React from 'react';
import { Box, Grid } from '@mui/material'
import { CardInfo } from 'Plugins/Models/Entry';
import SpecialBigCard from './SpecialBigCard';

interface SpecialBigCardListProps {
    cardInfoList: CardInfo[];
    handleNavigation: (url: string) => void;
}

const SpecialBigCardList: React.FC<SpecialBigCardListProps> = ({ cardInfoList, handleNavigation }) => {
    return (
        <Box
            sx={{
                flex: 1,
                overflow: 'auto',
            }}
            className="bigcardlist-scrollbar"
        >
            <Grid container
                  spacing={2}
                  sx={{
                      gap: "16px",
                      paddingLeft: '64px',
                      paddingTop: '24px',
                      paddingRight: '64px',
                      paddingBottom: '48px',
                  }}
            >
                {cardInfoList.map((cardInfo, index) => (
                    <Box key={index} sx={{ marginRight: index !== cardInfoList.length - 1 ? '16px' : '0' }}>
                        <SpecialBigCard cardInfo={cardInfo} handleNavigation={handleNavigation} />
                    </Box>
                ))}
            </Grid>
        </Box>
    );

};

export default SpecialBigCardList;
