import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Toolbar, AppBar } from '@mui/material';
import { createEntry, deleteEntry, testEntry } from 'Plugins/EntryAPI/EntryExecution'
import {
    changeUserAvatar, changeUserNickname,
    getUserInfo,
    getUserInfoByIdList,
    userAuthorityChange,
    userPasswordChange,
} from 'Plugins/UserAPI/UserExecution'
import {
    CommentType,
    createComment,
    deleteComment, flipScoreHistogram, modifyComment,
    queryCommentByObject,
    queryCommentByUser, queryCommentLikes,
} from 'Plugins/CommentAPI/CommentExecution'
import {
    createStar, deleteStar, flipStar,
    queryStaredObjectIdList,
    StarType,
    testStar,
} from 'Plugins/StarAPI/StarExecution'
import {
    changeImage, changeIsFood, changeIsHidden, changeIsNew,
    getCardInfo,
    getCardInfoByFather,
    getCardInfoByGrandfather,
} from 'Plugins/EntryAPI/CardInfoExecution'
import ScoreCard from '../Components/ScoreCard'
import SmallScoreCard from '../Components/SmallScoreCard'
import { changeArticle, getArticle } from 'Plugins/EntryAPI/ArticleExecution'
import { createAd, deleteAd, getAdList, modifyAd } from 'Plugins/AdvertisementAPI/AdvertisementExecution'



interface RouteParams {
    id: string;
}


export function TestPage() {
    const [imageSrcLow, setImageSrcLow] = useState<string>('http://localhost:10000/images/ZDkwZDliZTEtYjlmOC00YzRjLTk4MjEtYzZlMTNiMjc0MGU5-low.jpg');
    const [imageSrcHigh, setImageSrcHigh] = useState<string>('http://localhost:10000/images/ZDkwZDliZTEtYjlmOC00YzRjLTk4MjEtYzZlMTNiMjc0MGU5-high.jpg');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await fetch('http://localhost:10000/images', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const imageName = await response.text();
                setImageSrcLow(`http://localhost:10000/images/${imageName}-low.jpg`);
                setImageSrcHigh(`http://localhost:10000/images/${imageName}-high.jpg`);
                alert('Image uploaded successfully!');
            } else {
                alert('Failed to upload image.');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image.');
        }
    };

    useEffect(() => {
        const imgHigh = new Image();
        imgHigh.src = imageSrcHigh;
        imgHigh.onload = () => {
            setImageSrcLow(imageSrcHigh);
        };
    }, [imageSrcHigh]);

    const scoreHistogram = [0, 1, 0, 0, 0]; // 示例数据

    /*
    <h1>Image Viewer</h1>
            <img id="image" src={imageSrcLow} alt="Loaded Image" />
            <div>
                <input type="file" accept=".png,.jpg,.jpeg,.gif" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload Image</button>
            </div>
     */

    const handleClick1 =  () => {
        const ret = createAd();
        console.log(ret)
    };

    const handleClick2 =  () => {
        const ret = deleteAd(1);
        console.log(ret)
    };

    const handleClick3 =  () => {
        const ret = modifyAd(2, 233,"ima");
        console.log(ret)
    };

    const handleClick4=  () => {
        const ret = getAdList();
        console.log(ret)
    };

    return (
        <div id="app">

            <Button variant="contained" onClick={handleClick1} sx={{ ml: 2 }}>
                新建广告
            </Button>

            <Button variant="contained" onClick={handleClick2} sx={{ ml: 2 }}>
                删除广告
            </Button>

            <Button variant="contained" onClick={handleClick3} sx={{ ml: 2 }}>
                修改广告
            </Button>

            <Button variant="contained" onClick={handleClick4} sx={{ ml: 2 }}>
                查询广告
            </Button>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <ScoreCard scoreHistogram={scoreHistogram} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <SmallScoreCard scoreHistogram={scoreHistogram} />
            </div>
        </div>
    );
}

/*
export function TestPage() {
    const params = useParams<RouteParams>();
    const history = useHistory();

    const username = localStorage.getItem('username') || '';
    const currentNodeId: number = Number(params.id);
    console.log("currentNodeId :", currentNodeId);

    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);

    const handleNavigation = (path: string) => {
        history.push(path);
    };

    const handleClick4 = () => {
        setOpen(true);
    };

    const handleClick5 = async () => {
        const result = await userPasswordChange(1,"ls","lslsls");
        console.log(result);
    };

    const handleClick6 = async () => {
        const result = await userAuthorityChange("ls",1);
        console.log(result);
    };

    const handleClick7 = async () => {
        const result = await createComment("OneStar",1,1,CommentType.ScoreForEntry);
        console.log(result);
    };

    const handleClick9 = async () => {
        const result = await deleteComment(2);
        console.log(result);
    };

    const handleClick16 = async () => {
        const result =await testStar(1,1, StarType.LikeForBlog);
        console.log(result);
    }

    const handleClick17 = async () => {
        const result =await createStar(1,1, StarType.LikeForBlog);
        console.log(result);
    }

    const handleClick18 = async () => {
        const result =await queryStaredObjectIdList(1, StarType.StarForEntry);
        console.log(result);
    }

    const handleClick19 = async () => {
        const result =await queryCommentByObject(1,CommentType.ScoreForEntry);
        console.log(result);
    }

    const handleClick20 = async () => {
        const result =await queryCommentByUser(1,CommentType.ScoreForEntry);
        console.log(result);
    }

    const handleClick21 = async () => {
        const result =await modifyComment(1,"haha");
        console.log(result);
    }

    const handleClick22 = async () => {
        const result =await deleteStar(1,1,StarType.LikeForBlog);
        console.log(result);
    }

    const handleClick23 = async () => {
        const result =await createEntry(0,0);
        console.log(result);
    }

    const handleClick24 = async () => {
        const result =await testEntry(1);
        console.log(result);
    }

    const handleClick25 = async () => {
        const result =await deleteEntry(1);
        console.log(result);
    }

    const handleClick26 = async () => {
        const result =await getCardInfo(1);
        console.log(result);
    }

    const handleClick27 = async () => {
        const result =await getCardInfoByFather(1);
        console.log(result);
    }

    const handleClick28 = async () => {
        const result =await getCardInfoByGrandFather(1);
        console.log(result);
    }

    const handleClick29 = async () => {
        const result =await queryCommentLikes(1);
        console.log(result);
    }

    const handleClick30 = async () => {
        const result =await flipStar(1,1,StarType.LikeForComment);
        console.log(result);
    }

    const handleClick31 = async () => {
        const result =await flipStar(1,1,StarType.StarForEntry);
        console.log(result);
    }

    const handleClick32 = async () => {
        const result =await flipScoreHistogram(1,1, 1);
        console.log(result);
    }

    const handleClose = () => {
        setOpen(false);
        setSelectedFile(null);
        setFileError(null);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const fileType = file.type;
            const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (validImageTypes.includes(fileType)) {
                setSelectedFile(file);
                setFileError(null);
            } else {
                setFileError('只允许上传 JPG, JPEG, PNG 类型的文件');
                setSelectedFile(null);
            }
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="fixed">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                        <Typography variant="h6" component="div" sx={{ marginRight: 2 }}>
                            THU Food
                        </Typography>
                        <Button color="inherit" onClick={() => handleNavigation('/home')}>主页</Button>
                        <Button color="inherit" onClick={() => handleNavigation('/profile')}>用户</Button>
                        <Button color="inherit" onClick={() => handleNavigation('/settings')}>设置</Button>
                    </Box>
                    <TextField
                        placeholder="搜索"
                        variant="outlined"
                        size="small"
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: 1,
                            marginRight: 2,
                        }}
                    />
                    <Typography variant="h6" component="div">
                        欢迎 {username}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Toolbar />

            <Container sx={{ mt: 8, mb: 2 }}>

                <Button variant="contained" onClick={handleClick4} sx={{ ml: 2 }}>
                    上传图片
                </Button>

                <Button variant="contained" onClick={handleClick5} sx={{ ml: 2 }}>
                    修改密码
                </Button>

                <Button variant="contained" onClick={handleClick6} sx={{ ml: 2 }}>
                    修改权限
                </Button>

                <Button variant="contained" onClick={handleClick7} sx={{ ml: 2 }}>
                    添加评论
                </Button>

                <Button variant="contained" onClick={handleClick9} sx={{ ml: 2 }}>
                    删除评论
                </Button>

                <Button variant="contained" onClick={handleClick17} sx={{ ml: 2 }}>
                    新建收藏
                </Button>

                <Button variant="contained" onClick={handleClick16} sx={{ ml: 2 }}>
                    测试收藏
                </Button>

                <Button variant="contained" onClick={handleClick18} sx={{ ml: 2 }}>
                    查询 User 的收藏列表
                </Button>

                <Button variant="contained" onClick={handleClick19} sx={{ ml: 2 }}>
                    查询 Entry 的评论列表
                </Button>

                <Button variant="contained" onClick={handleClick20} sx={{ ml: 2 }}>
                    查询 User 的评论列表
                </Button>

                <Button variant="contained" onClick={handleClick21} sx={{ ml: 2 }}>
                    修改评论
                </Button>

                <Button variant="contained" onClick={handleClick22} sx={{ ml: 2 }}>
                    删除收藏
                </Button>

                <Button variant="contained" onClick={handleClick23} sx={{ ml: 2 }}>
                    新建 Entry
                </Button>

                <Button variant="contained" onClick={handleClick24} sx={{ ml: 2 }}>
                    测试 Entry
                </Button>

                <Button variant="contained" onClick={handleClick25} sx={{ ml: 2 }}>
                    删除 Entry
                </Button>

                <Button variant="contained" onClick={handleClick26} sx={{ ml: 2 }}>
                    查询 CradInfo
                </Button>

                <Button variant="contained" onClick={handleClick27} sx={{ ml: 2 }}>
                    查询儿子的 CradInfo
                </Button>

                <Button variant="contained" onClick={handleClick28} sx={{ ml: 2 }}>
                    查询孙子的 CradInfo
                </Button>

                <Button variant="contained" onClick={handleClick29} sx={{ ml: 2 }}>
                    查询评论点赞数
                </Button>

                <Button variant="contained" onClick={handleClick30} sx={{ ml: 2 }}>
                    评论点赞翻转
                </Button>

                <Button variant="contained" onClick={handleClick31} sx={{ ml: 2 }}>
                    条目收藏翻转
                </Button>

                <Button variant="contained" onClick={handleClick32} sx={{ ml: 2 }}>
                    评分直方图翻转
                </Button>

            </Container>
        </Box>
    );
}
*/