import React from 'react';
import { Box } from '@mui/material';
import { CardInfo } from 'Plugins/Models/Entry';
import SpecialBigCard from './SpecialBigCard';

interface SpecialBigCardListProps {
    cardInfoList: CardInfo[];
    handleNavigation: (url: string) => void;
}

const SpecialBigCardList: React.FC<SpecialBigCardListProps> = ({ cardInfoList, handleNavigation }) => {
    return (
        <Box
            className="bigcardlist-scrollbar"
            sx={{
                display: 'grid',
                overflow: 'hidden',
                overflowY: 'auto',
                maxHeight: 'calc(100vh - 200px)',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: "16px",
                flexGrow: 1,
                paddingLeft: '20px',
                paddingTop: '20px',
                paddingRight: '20px'
            }}
        >
            {Array.isArray(cardInfoList) &&
                cardInfoList.map((cardInfo, index) => (
                    <Box key={index} sx={{ marginRight: index !== cardInfoList.length - 1 ? '16px' : '0' }}>
                        <SpecialBigCard cardInfo={cardInfo} handleNavigation={handleNavigation} />
                    </Box>
                ))}
        </Box>
    );
};

export default SpecialBigCardList;
