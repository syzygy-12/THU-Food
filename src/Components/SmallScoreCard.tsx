import React from 'react';
import { Box, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';

interface SmallScoreCardProps {
    scoreHistogram: number[];
    starSize?: string | number; // 增加控制星星大小的参数，默认为 1.5rem
}

const SmallScoreCard: React.FC<SmallScoreCardProps> = ({ scoreHistogram, starSize = '1.5rem' }) => {
    const totalVotes = scoreHistogram.reduce((a, b) => a + b, 0);
    const averageScore = totalVotes ? (scoreHistogram.reduce((sum, count, index) => sum + count * (index + 1), 0) / totalVotes) : 0;
    const stars = Math.round(averageScore * 2 + 0.5) / 2; // 将分数转换为 0.5 的倍数

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px',
                backgroundColor: 'transparent'
            }}
        >
            {totalVotes === 0 ? (
                <Typography variant="body2">还没有评分</Typography>
            ) : (
                [...Array(5)].map((_, i) => (
                    i < stars ? (
                        stars - i === 0.5 ? (
                            <StarHalfIcon key={i} sx={{ color: '#ffa726', fontSize: starSize }} />
                        ) : (
                            <StarIcon key={i} sx={{ color: '#ffa726', fontSize: starSize }} />
                        )
                    ) : (
                        <StarBorderIcon key={i} sx={{ color: '#ffa726', fontSize: starSize }} />
                    )
                ))
            )}
        </Box>
    );
};

export default SmallScoreCard;
