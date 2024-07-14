import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material'
import { CardInfo } from 'Plugins/Models/Entry';

interface ExploreHeadProps {
    cardInfo: CardInfo;
    handleNavigation: (url: string) => void;
    handleCreateAndUpdate: () => Promise<void>;
    handleDelete: () => void;
    handleStarToggle: () => Promise<void>;
    isStarred: boolean;
}

const ExploreHead: React.FC<ExploreHeadProps> = ({
                                                       cardInfo,
                                                       handleNavigation,
                                                       handleCreateAndUpdate,
                                                       handleDelete,
                                                       handleStarToggle,
                                                       isStarred
                                                   }) => {

    return (
        <Box>
            <Button variant="contained" onClick={handleCreateAndUpdate} sx={{ flex: 0, ml: 2 }}>创建节点</Button>
            <Button variant="contained" color="error" onClick={handleDelete} sx={{ flex: 0, ml: 2 }}>删除节点</Button>
            <Typography sx={{ flex: 0, ml: 2, display: 'inline-block' }}>目前ID: {cardInfo.id}  fatherID: {cardInfo.fatherID}</Typography>
            <Button variant="contained" onClick={() => handleNavigation(`/comment/${cardInfo.id}`)} sx={{ flex: 0, ml: 2 }}>介绍</Button>
            <Button
                variant="contained"
                color={isStarred ? 'secondary' : 'primary'}
                onClick={handleStarToggle}
                sx={{ ml: 2 }}
            >
                {isStarred ? '取消收藏' : '收藏'}
            </Button>
        </Box>
    );
};

export default ExploreHead;
