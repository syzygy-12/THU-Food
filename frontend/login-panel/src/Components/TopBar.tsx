import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, TextField } from '@mui/material';
import { useHistory } from 'react-router-dom';

export class TopBarData {
    title: string;
    username: string;
    links: { label: string, path: string }[];

    constructor(title: string, username: string, links: { label: string, path: string }[]) {
        this.title = title;
        this.username = username;
        this.links = links;
    }
}

interface TopBarProps {
    data: TopBarData;
}

export const TopBar: React.FC<TopBarProps> = ({ data }) => {
    const history = useHistory();

    const handleNavigation = (path: string) => {
        history.push(path);
    };

    return (
        <AppBar position="fixed">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <Typography variant="h6" component="div" sx={{ marginRight: 2 }}>
                        {data.title}
                    </Typography>
                    {data.links.map((link, index) => (
                        <Button key={index} color="inherit" onClick={() => handleNavigation(link.path)}>
                            {link.label}
                        </Button>
                    ))}
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
                    欢迎 {data.username}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

