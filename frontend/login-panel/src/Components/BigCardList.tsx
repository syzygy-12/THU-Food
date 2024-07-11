import React from 'react';
import { Grid } from '@mui/material';
import BigCard from './BigCard';
import { CardInfo } from 'Plugins/Models/Entry';

interface BigCardInfo {
    cardInfo: CardInfo;
    smallCardInfoList: CardInfo[];
}

interface BigCardListProps {
    bigCardInfoList: BigCardInfo[];
    handleNavigation: (url: string) => void;
}

export const generateBigCardInfoList = (sonCardInfoList: CardInfo[], grandCardInfoList: CardInfo[]): BigCardInfo[] => {
    return sonCardInfoList.map(sonCardInfo => {
        const smallCardInfoList = grandCardInfoList.filter(grandCardInfo => grandCardInfo.fatherId === sonCardInfo.id);
        return {
            cardInfo: sonCardInfo,
            smallCardInfoList: smallCardInfoList
        };
    });
};

const BigCardList: React.FC<BigCardListProps> = ({ bigCardInfoList, handleNavigation }) => {
    return (
        <Grid
            container
            spacing={2}
            className="bigcardlist-scrollbar"
            sx={{
                flexWrap: 'nowrap',
                overflowX: 'auto',
                overflowY: 'hidden',
                padding: "16px",
                position: 'relative',
                flexGrow: 1
            }}
        >
            {Array.isArray(bigCardInfoList) &&
                bigCardInfoList.map((bigCardInfo, index) => (
                    <Grid item key={index} sx={{ marginRight: index !== bigCardInfoList.length - 1 ? '16px' : '0' }}>
                        <BigCard bigCardInfo={bigCardInfo} handleNavigation={handleNavigation} />
                    </Grid>
                ))}
        </Grid>
    );
};

export default BigCardList;
