import React, { SyntheticEvent, useEffect, useState } from 'react'
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
import { ImageComponent2 } from './Image'
import { testEntry } from 'Plugins/EntryAPI/EntryExecution'
import { getCardInfo } from 'Plugins/EntryAPI/CardInfoExecution'
import { StarType, testStar, testStarByUserIdAndObjectIdList } from 'Plugins/StarAPI/StarExecution'
import { getArticle } from 'Plugins/EntryAPI/ArticleExecution'
import { getUserInfoByIdList } from 'Plugins/UserAPI/UserExecution'

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
    const [comments, setComments] = useState([]);
    const [article, setArticle] = useState('');

    const userId = parseInt(localStorage.getItem('userId') || '0', 10);
    const objectId = cardInfo.id;

    const fetchData = async () => {
        const entryTestResult = await testEntry(objectId);
        if (entryTestResult) {
            const article = await getArticle(objectId);
            setArticle(article);
        }
    };

    useEffect(() => {
        fetchData();
    }, [objectId]);

    const handleCommentButtonClick = async () => {
        if (!showComments) {
            const fetchedComments = await queryCommentByObject(cardInfo.id, CommentType.CommentForEntry);
            if (!fetchedComments.length) {
                setComments(fetchedComments);
            } else {
                const userIds = fetchedComments.map(comment => comment.userId);
                const [ userInfoList, likedList ] = await Promise.all([
                    getUserInfoByIdList(userIds),
                    testStarByUserIdAndObjectIdList(userId, fetchedComments.map(comment => comment.id), StarType.LikeForComment)
                ]);
                const commentsWithUserInfo = fetchedComments.map((comment, index) => ({
                    ...comment,
                    userInfo: userInfoList[index],
                    liked: likedList[index]
                }));
                setComments(commentsWithUserInfo);
            }
        }
        setShowComments(!showComments);
    };

    const handleCommentSubmit = async (content: string) => {
        const commentExists = await testComment(userId, cardInfo.id, CommentType.CommentForEntry);
        if (!commentExists) {
            if (!content.trim()) return;
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
                        <ImageComponent2 imageName={cardInfo.image} height='100%' width='100%'/>
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
                        {article}
                    </Typography>

                </Grid>
                <Grid item xs={3}>
                    <ScoreCard scoreHistogram={cardInfo.scoreHistogram} />
                </Grid>
                <Box>

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
