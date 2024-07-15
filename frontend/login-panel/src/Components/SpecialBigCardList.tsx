import React from 'react';
import { Box, Grid } from '@mui/material'
import { CardInfo } from 'Plugins/Models/Entry';
import SpecialBigCard from './SpecialBigCard';

interface SpecialBigCardListProps {
    cardInfoList: CardInfo[];
    handleNavigation: (url: string) => void;
    showPath: boolean
}

const SpecialBigCardList: React.FC<SpecialBigCardListProps> = ({ cardInfoList, handleNavigation, showPath}) => {
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
                      gap: '8px',
                      paddingLeft: '64px',
                      paddingTop: '24px',
                      paddingRight: '64px',
                      paddingBottom: '80px',
                  }}
            >
                {cardInfoList.map((cardInfo, index) => (
                    <Box key={index} sx={{ marginRight: '0', marginTop: '16px' }}>
                        <SpecialBigCard cardInfo={cardInfo} handleNavigation={handleNavigation} showPath={showPath}/>
                    </Box>
                ))}
            </Grid>
        </Box>
    );

};

export default SpecialBigCardList;
