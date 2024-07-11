import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Toolbar, AppBar } from '@mui/material';
import { createEntry, deleteEntry, testEntry } from 'Plugins/EntryAPI/EntryExecution'
import { userAuthorityChange, userPasswordChange } from 'Plugins/UserAPI/UserExecution'
import {
    CommentType,
    createComment,
    deleteComment, modifyComment, queryComment, queryCommentByIdList,
    queryCommentByObject,
    queryCommentByUser,
} from 'Plugins/CommentAPI/CommentExecution'
import {
    createStar, deleteStar,
    queryStaredObjectIdList,
    StarType,
    testStar,
} from 'Plugins/StarAPI/StarExecution'
import {
    getCardInfo,
    getCardInfoByFather,
    getCardInfoByGrandFather,
    getCardInfoByIdList,
} from 'Plugins/EntryAPI/CardInfoExecution'


interface RouteParams {
    id: string;
}

/*
export function TestPage() {
    const [imageSrcLow, setImageSrcLow] = useState<string>('http://localhost:10000/images/default-low.jpg');
    const [imageSrcHigh, setImageSrcHigh] = useState<string>('http://localhost:10000/images/default-high.jpg');
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

    return (
        <div id="app">
            <h1>Image Viewer</h1>
            <img id="image" src={imageSrcLow} alt="Loaded Image" />
            <div>
                <input type="file" accept=".png,.jpg,.jpeg,.gif" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload Image</button>
            </div>
        </div>
    );
}
*/

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

    const handleClick1 = async () => {
        const result = await createComment("aaaaa",1,1, CommentType.CommentForEntry);
        console.log(result);
    };

    const handleClick2 = async () => {
        const result = await queryComment(1,1, CommentType.CommentForEntry);
        console.log(result);
    };

    const handleClick3 = async () => {
        const result = await queryCommentByIdList([2,3]);
        console.log(result);
    };

    const handleClick4 = async () => {
        const result = await getCardInfoByIdList([12,23,34]);
        console.log(result);
    };

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
            <Toolbar /> {/* 用于占位，使内容不被顶栏遮挡 */}

            <Container sx={{ mt: 8, mb: 2 }}>

                <Button variant="contained" onClick={handleClick1} sx={{ ml: 2 }}>
                    创建评论
                </Button>

                <Button variant="contained" onClick={handleClick2} sx={{ ml: 2 }}>
                    查询评论
                </Button>

                <Button variant="contained" onClick={handleClick3} sx={{ ml: 2 }}>
                    查询评论 by idlist
                </Button>

                <Button variant="contained" onClick={handleClick4} sx={{ ml: 2 }}>
                    查询 Entry by idlist
                </Button>

            </Container>
        </Box>
    );
}
