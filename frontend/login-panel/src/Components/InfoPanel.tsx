import React, { SyntheticEvent, useState } from 'react'
import { Box, Typography, Grid, Button, IconButton } from '@mui/material';
import { CardInfo } from 'Plugins/Models/Entry';
import ScoreCard from '../Components/ScoreCard';
import Rating from '@mui/material/Rating';
import CommentIcon from '@mui/icons-material/Comment';
import EditIcon from '@mui/icons-material/Edit';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CommentList from './CommentList'
import {
    CommentType,
    createComment, deleteComment, modifyComment,
    queryComment,
    queryCommentByObject,
    testComment,
} from 'Plugins/CommentAPI/CommentExecution'
import CommentForm from './CommentForm'

interface InfoPanelProps {
    cardInfo: CardInfo;
    handleNavigation: (url: string) => void;
    isStarred: boolean;
    handleToggleStar: () => void;
    score: number;
    handleScoreChange: (event: SyntheticEvent<Element, Event>, score: number) => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({
                                                 cardInfo, handleNavigation, isStarred,
                                                 handleToggleStar, score, handleScoreChange}) => {

    const [showComments, setShowComments] = useState(false);
    const [isCommentsFetched, setIsCommentsFetched] = useState(false);
    const [comments, setComments] = useState([]);

    const userId = parseInt(localStorage.getItem('userId') || '0', 10);
    const objectId = cardInfo.id;

    const handleCommentButtonClick = async () => {
        if (!isCommentsFetched) {
            const comments = await queryCommentByObject(cardInfo.id, CommentType.CommentForEntry);
            setComments(comments);
        }
        setShowComments(!showComments);
        setIsCommentsFetched(true);
    };

    const handleCommentSubmit = async (content: string) => {
        const commentExists = await testComment(userId, cardInfo.id, CommentType.CommentForEntry);
        if (!commentExists) {
            await createComment(content, userId, cardInfo.id, CommentType.CommentForEntry);
        } else {
            const comment = await queryComment(userId, cardInfo.id, CommentType.CommentForEntry);
            if (!content.trim()) {
                await deleteComment(comment.id);
            } else {
                await modifyComment(comment.id, content);
            }
        }

        const newComments = await queryCommentByObject(cardInfo.id, CommentType.CommentForEntry);
        setComments(newComments);
    };

    return (
        <Box
            sx={{
                paddingTop: '64px',
                paddingLeft: '64px',
                paddingRight: '64px',
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                justifyContent: 'flex-start'
            }}
        >
            <Typography variant="h4" gutterBottom>
                {cardInfo.name}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Box
                        sx={{
                            width: '320px',
                            height: '240px',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            backgroundColor: '#fff'
                        }}
                    >
                        <img
                            src="https://images.pexels.com/photos/18939401/pexels-photo-18939401.jpeg?
                            auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt={cardInfo.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body2" gutterBottom>
                        {cardInfo.id}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {cardInfo.name}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        在这里写介绍
                    </Typography>

                </Grid>
                <Grid item xs={3}>
                    <ScoreCard scoreHistogram={cardInfo.scoreHistogram} />
                </Grid>
                <Box>
                    {/* 添加“想看”、“看过”按钮和评分 */}
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
                        <Box sx={{ marginRight: '16px', display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body2" sx={{ marginRight: '8px' }}>
                                评分:
                            </Typography>
                            <Rating
                                name="rating"
                                value={score}
                                precision={1}
                                onChange={handleScoreChange}
                            />
                        </Box>
                        <Button
                            variant="contained"
                            color={isStarred ? "secondary" : "primary"}
                            onClick={handleToggleStar}
                            startIcon={isStarred ? <StarIcon /> : <StarBorderIcon />}
                        >
                            {isStarred ? "取消收藏" : "收藏"}
                        </Button>
                    </Box>

                    {/* 添加评论、影评、分享链接 */}
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
                        <IconButton sx={{ marginRight: '8px' }} onClick={handleCommentButtonClick}>
                            <CommentIcon />
                            <Typography variant="body2" sx={{ marginLeft: '4px' }}>写短评</Typography>
                        </IconButton>
                        <IconButton sx={{ marginRight: '8px' }}>
                            <EditIcon />
                            <Typography variant="body2" sx={{ marginLeft: '4px' }}>写食评</Typography>
                        </IconButton>
                    </Box>

                    {showComments && <CommentForm userId={userId} objectId={objectId} onSubmit={handleCommentSubmit}/>}

                    {showComments && <CommentList comments={comments} userId={userId} />}

                </Box>

            </Grid>
        </Box>
    );
};

export default InfoPanel;
