import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface CardInfo {
    id: number;
    fatherId: number;
    name: string;
}

interface SmallCardProps {
    cardInfo: CardInfo;
    onNavigate: (url: string) => void;
}

const SmallCard: React.FC<SmallCardProps> = ({ cardInfo, onNavigate }) => {
    return (
        <Card
            onClick={() => onNavigate(`/explore/${cardInfo.id}`)}
            sx = {{
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 200, height: 60
            }}
        >
            <CardContent>
                <Typography variant="h6">{cardInfo.id}: {cardInfo.name}</Typography>
            </CardContent>
        </Card>
    );
};

export default SmallCard;
