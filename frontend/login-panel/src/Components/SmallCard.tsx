import React from 'react';
import { Typography, Card, CardContent, Grid } from '@mui/material'
import { useHistory } from 'react-router-dom';

export interface SmallCardData {
    id: number;
    name: string;
}

interface SmallCardProps {
    data: SmallCardData;
}

const SmallCard: React.FC<SmallCardProps> = ({ data }) => {
    const history = useHistory();

    const handleNavigation = (path: string) => {
        history.push(path);
    };

    return (
        <Grid item xs={12} sm={6} md={4} key={data.id}>
            <Card onClick={() => handleNavigation(`/explore/${data.id}`)} sx={{ cursor: 'pointer' }}>
                <CardContent>
                    <Typography variant="h6">ID: {data.id}</Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default SmallCard;