import React from 'react';
import { Box, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export interface ScoreHistogramProps {
    scoreHistogram: number[];
}

const ScoreCard: React.FC<ScoreHistogramProps> = ({ scoreHistogram }) => {
    const totalVotes = scoreHistogram.reduce((a, b) => a + b, 0);
    const averageScore = totalVotes ? (scoreHistogram.reduce((sum, count, index) => sum + count * (index + 1), 0) / totalVotes) : 0;
    const averageScoreDisplay = (averageScore * 2).toFixed(1);
    const stars = Math.round(averageScore * 2 ) / 2;

    return (
        <Box
            sx={{
                width: '240px',
                height: '240px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxSizing: 'border-box',
                backgroundColor: '#fff',
                paddingTop: '12px'
            }}
        >
            {totalVotes === 0 ? (
                <Typography variant="h6">还没有评分</Typography>
            ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', minWidth: '210px', maxWidth: '210px' }}>
                    <Typography variant="h3" sx={{ marginBottom: '0px' }}>
                        {averageScoreDisplay}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                        {[...Array(5)].map((_, i) => (
                            i < stars ? (
                                stars - i === 0.5 ? (
                                    <StarHalfIcon key={i} sx={{ color: '#ffa726' }} />
                                ) : (
                                    <StarIcon key={i} sx={{ color: '#ffa726' }} />
                                )
                            ) : (
                                <StarBorderIcon key={i} sx={{ color: '#ffa726' }} />
                            )
                        ))}
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                        {totalVotes}人评价
                    </Typography>
                    <Box sx={{ width: '100%', marginTop: '16px'}}>
                        {scoreHistogram.slice().reverse().map((count, index) => (
                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: '0px' }}>
                                <Typography sx={{ width: '15%', textAlign: 'right', marginRight: '8px', fontSize: '0.75rem' }}>{5 - index}星</Typography>
                                <Box
                                    sx={{
                                        height: '10px',
                                        width: '120px',
                                        backgroundColor: '#f0f0f0',
                                        borderRadius: '0px',
                                        position: 'relative',
                                        marginRight: '8px',
                                        display: 'flex'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            height: '10px',
                                            width: `${(count / totalVotes) * 120}px`,
                                            backgroundColor: '#ffa726',
                                            borderRadius: '0px'
                                        }}
                                    />
                                </Box>
                                <Typography sx={{ fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                                    {((count / totalVotes) * 100).toFixed(1)}%
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default ScoreCard;
