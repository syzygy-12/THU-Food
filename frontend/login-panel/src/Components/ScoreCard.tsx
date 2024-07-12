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
    const stars = Math.round(averageScore * 2 + 0.5) / 2; // 将分数转换为 0.5 的倍数

    return (
        <Box
            sx={{
                width: '300px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '16px',
                boxSizing: 'border-box',
                backgroundColor: '#fff'
            }}
        >
            {totalVotes === 0 ? (
                <Typography variant="h6">还没有评分</Typography>
            ) : (
                <>
                    <Typography variant="h3" sx={{ marginBottom: '8px' }}>
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
                    <Box sx={{ width: '100%', marginTop: '16px' }}>
                        {scoreHistogram.slice().reverse().map((count, index) => (
                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                                <Typography sx={{ width: '15%', textAlign: 'right', marginRight: '8px', fontSize: '0.875rem' }}>{5 - index}星</Typography>
                                <Box
                                    sx={{
                                        height: '10px',
                                        flex: 1,
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
                                            width: `${(count / totalVotes) * 100}%`,
                                            backgroundColor: '#ffa726',
                                            borderRadius: '0px'
                                        }}
                                    ></Box>
                                </Box>
                                <Typography sx={{ fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
                                    {((count / totalVotes) * 100).toFixed(1)}%
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </>
            )}
        </Box>
    );
};

export default ScoreCard;
