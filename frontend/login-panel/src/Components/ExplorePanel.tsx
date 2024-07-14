import React from 'react';
import { Box } from '@mui/material';
import { CardInfo } from 'Plugins/Models/Entry';
import BigCardList, { generateBigCardInfoList } from './BigCardList';
import ExploreHead from './ExploreHead';
import SpecialBigCardList from './SpecialBigCardList';

interface ExplorePanelProps {
    cardInfo: CardInfo;
    sonCardInfoList: CardInfo[];
    grandsonCardInfoList: CardInfo[];
    handleNavigation: (url: string) => void;
    handleCreateAndUpdate: () => Promise<void>;
    handleDelete: () => void;
    handleStarToggle: () => Promise<void>;
    isStarred: boolean;
}

const ExplorePanel: React.FC<ExplorePanelProps> = ({
                                                       cardInfo,
                                                       sonCardInfoList,
                                                       grandsonCardInfoList,
                                                       handleNavigation,
                                                       handleCreateAndUpdate,
                                                       handleDelete,
                                                       handleStarToggle,
                                                       isStarred
                                                   }) => {
    if (sonCardInfoList.length >= 1 && sonCardInfoList[0].isFood) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    overflow: 'hidden',
                }}
            >
                <ExploreHead
                    cardInfo={cardInfo}
                    handleNavigation={handleNavigation}
                    handleCreateAndUpdate={handleCreateAndUpdate}
                    handleDelete={handleDelete}
                    handleStarToggle={handleStarToggle}
                    isStarred={isStarred}
                />
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        overflow: 'hidden',
                        paddingTop: '16px'
                    }}
                >
                    <SpecialBigCardList
                        cardInfoList={sonCardInfoList}
                        handleNavigation={handleNavigation}
                    />
                </Box>
            </Box>
        );
    }

    const bigCardInfoList = generateBigCardInfoList(sonCardInfoList, grandsonCardInfoList);

    return (
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', mt: 6, mb: 2, width: '100%', paddingLeft: 0, paddingRight: 0, boxSizing: 'border-box' }}>
            <ExploreHead
                cardInfo={cardInfo}
                handleNavigation={handleNavigation}
                handleCreateAndUpdate={handleCreateAndUpdate}
                handleDelete={handleDelete}
                handleStarToggle={handleStarToggle}
                isStarred={isStarred}
            />
            <Box sx={{ flexGrow: 1, display: 'flex', width: '100%', paddingLeft: 0, paddingRight: 0, boxSizing: 'border-box' }}>
                <BigCardList
                    bigCardInfoList={bigCardInfoList}
                    handleNavigation={handleNavigation}
                />
            </Box>
        </Box>
    );
};

export default ExplorePanel;
