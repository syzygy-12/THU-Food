import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, TextField, Menu, MenuItem } from '@mui/material';
import { useHistory } from 'react-router-dom';
import SearchBar from './SearchBar'

export class TopBarData {
    title: string;
    username: string;
    links: { label: string, path: string }[];
    backgroundColor: string;

    constructor(title: string, username: string, links: { label: string, path: string }[], backgroundColor: string = '#660874') {
        this.title = title;
        this.username = username;
        this.links = links;
        this.backgroundColor = backgroundColor;
    }
}

interface TopBarProps {
    data: TopBarData;
}

export const TopBar: React.FC<TopBarProps> = ({ data }) => {
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isLoggedIn = !!localStorage.getItem('username'); // 检查是否已登录

    const handleNavigation = (path: string) => {
        history.push(path);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        handleMenuClose();
        history.push('/home');
        window.location.reload();
    };

    const handleLoginRegister = () => {
        handleMenuClose();
        history.push('/main');
    };

    return (
        <AppBar position="fixed" sx={{ backgroundColor: data.backgroundColor }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center'}}>
                    <Typography variant="h6" component="div" sx={{ marginRight: 2 }}>
                        {data.title}
                    </Typography>
                    {data.links.map((link, index) => (
                        <Button key={index} color="inherit" onClick={() => handleNavigation(link.path)}>
                            {link.label}
                        </Button>
                    ))}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <SearchBar width="256px" height="40px" backgroundColor="#f0f0f0" handleNavigation={handleNavigation}/>
                    <Button color="inherit" onClick={handleMenuOpen} sx={{ textTransform: 'none' }}>
                        欢迎 {data.username}
                    </Button>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={() => { handleMenuClose(); handleNavigation('/settings'); }}>用户设置</MenuItem>
                    <MenuItem onClick={() => { handleMenuClose(); handleNavigation('/userpage/:id'); }}>用户主页</MenuItem>
                    {isLoggedIn ? (
                        <MenuItem onClick={handleLogout}>登出</MenuItem>
                    ) : (
                        <MenuItem onClick={handleLoginRegister}>登录/注册</MenuItem>
                    )}
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

