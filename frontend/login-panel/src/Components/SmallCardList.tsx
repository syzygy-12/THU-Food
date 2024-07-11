import React from 'react';
import { Grid } from '@mui/material';
import SmallCard from './SmallCard';

interface CardInfo {
    id: number;
    fatherId: number;
    name: string;
}

interface SmallCardListProps {
    cardInfoList: CardInfo[];
    handleNavigation: (url: string) => void;
}

const SmallCardList: React.FC<SmallCardListProps> = ({ cardInfoList, handleNavigation }) => {
    return (
        <Grid container spacing={2} sx={{ mt: 4 }}>
            {Array.isArray(cardInfoList) && cardInfoList.map((cardInfo) => (
                <SmallCard cardInfo={cardInfo} onNavigate={handleNavigation} />
            ))}
        </Grid>
    );
};

export default SmallCardList;
