import React from 'react';
import { Box } from '@mui/material';
import { CardInfo } from 'Plugins/Models/Entry';
import BigCardList, { generateBigCardInfoList } from './BigCardList';
import ExploreHead from './ExploreHead';
import SpecialBigCardList from './SpecialBigCardList';
import { ImageComponent2 } from './Image';

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
    const backgroundImage = (
        <Box
            sx={{
                position: 'absolute',
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                overflow: 'hidden'
            }}
        >
            <ImageComponent2
                imageName={cardInfo.image}
                height="100%"
                width="100%"
                opacity={66}
            />
        </Box>
    );

    const exploreHead = (
        <ExploreHead
            cardInfo={cardInfo}
            handleNavigation={handleNavigation}
            handleCreateAndUpdate={handleCreateAndUpdate}
            handleDelete={handleDelete}
            handleStarToggle={handleStarToggle}
            isStarred={isStarred}
        />
    );

    if (sonCardInfoList.length >= 1 && sonCardInfoList[0].isFood) {
        return (
            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    overflow: 'hidden',
                }}
            >
                {backgroundImage}
                {exploreHead}
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
                        showPath={false}
                    />
                </Box>
            </Box>
        );
    }

    const bigCardInfoList = generateBigCardInfoList(sonCardInfoList, grandsonCardInfoList);

    return (
        <Box sx={{ position: 'relative', flexGrow: 1, display: 'flex', flexDirection: 'column', width: '100%', margin: 0 }}>
            {backgroundImage}
            {exploreHead}
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
