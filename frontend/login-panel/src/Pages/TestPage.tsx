import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Toolbar, AppBar } from '@mui/material';
import { getNodeById, modifyNode } from 'Plugins/EntryAPI/NodeExecution';
import { getNameById } from 'Plugins/EntryAPI/NameExecution';
import { createEntry, testEntry } from 'Plugins/EntryAPI/EntryExecution';
//import { createImage } from 'Plugins/ImageAPI/ImageExecution';
import { userAuthorityChange, userPasswordChange } from 'Plugins/UserAPI/UserExecution'
import {
    createComment,
    deleteComment,
    queryCommentByEntry,
    queryCommentByUser,
} from 'Plugins/CommentAPI/CommentExecution'
import {
    createStar,
    queryStaredEntryIdList,
    queryStaredObjectIdList,
    StarType,
    testStar,
} from 'Plugins/StarAPI/StarExecution'


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

    const handleClick = async () => {
        const result = await createEntry();
        console.log(result);
    };

    const handleClick2 = async () => {
        const id = 10;
        const checkEntryExists = await testEntry(id);
        if (checkEntryExists) {
            const resultNode = await getNodeById(id);
            console.log(resultNode);
            const resultName = await getNameById(id);
            console.log(resultName);
        } else {
            console.log("Entry does not exist!")
        }
    };

    const handleClick3 = async () => {
        const result = await modifyNode(4, { fatherId: 1, son: [1, 1] });
        console.log(result);
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
        const result = await createComment("abaaba",1,1);
        console.log(result);
    };

    const handleClick9 = async () => {
        const result = await deleteComment(3);
        console.log(result);
    };

    const handleClick15 = async () => {
        const result =await getNameById(1);
        console.log(result);
    }

    const handleClick16 = async () => {
        const result =await testStar(1,1, StarType.StarForEntry);
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
        const result =await queryCommentByEntry(1);
        console.log(result);
    }

    const handleClick20 = async () => {
        const result =await queryCommentByUser(1);
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
            <Toolbar /> {/* 用于占位，使内容不被顶栏遮挡 */}

            <Container sx={{ mt: 8, mb: 2 }}>
                <Button variant="contained" onClick={handleClick} sx={{ ml: 2 }}>
                    创建
                </Button>
                <Button variant="contained" onClick={handleClick2} sx={{ ml: 2 }}>
                    查询
                </Button>
                <Button variant="contained" onClick={handleClick3} sx={{ ml: 2 }}>
                    修改
                </Button>
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

                <Button variant="contained" onClick={handleClick15} sx={{ ml: 2 }}>
                    查询 Entry 的名字
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

            </Container>
        </Box>
    );
}
