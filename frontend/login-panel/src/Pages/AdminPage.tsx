import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Switch, FormControlLabel } from '@mui/material';
import { getCardInfoByIdList, changeIsNew, changeIsFood, changeIsHidden } from 'Plugins/EntryAPI/CardInfoExecution'; // 确保这些API正确导入

interface Node {
    id: number;
    name: string;
    isFood: boolean;
    isHidden: boolean;
    isNew: boolean;
}

export function AdminPage() {
    const [nodes, setNodes] = useState<Node[]>([]);

    const fetchNodeData = async () => {
        const nodeData = await getCardInfoByIdList([1, 2, 3]); // 假设我们有节点ID列表，实际使用时需替换为实际数据
        setNodes(nodeData);
    };

    useEffect(() => {
        fetchNodeData();
    }, []);

    const handleToggle = async (nodeId: number, field: keyof Node) => {
        const updatedNodes = nodes.map(node =>
            node.id === nodeId ? { ...node, [field]: !node[field] } : node
        );
        setNodes(updatedNodes);

        const updatedNode = updatedNodes.find(node => node.id === nodeId);
        if (updatedNode) {
            if (field === 'isNew') {
                await changeIsNew(nodeId, updatedNode.isNew);
            } else if (field === 'isFood') {
                await changeIsFood(nodeId, updatedNode.isFood);
            } else if (field === 'isHidden') {
                await changeIsHidden(nodeId, updatedNode.isHidden);
            }
        }
    };

    return (
        <Container sx={{ mt: 8, mb: 2 }}>
            <Typography variant="h4" gutterBottom>
                Node 管理
            </Typography>
            <Grid container spacing={2}>
                {nodes.map(node => (
                    <Grid item xs={12} sm={6} md={4} key={node.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{node.name}</Typography>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={node.isFood}
                                            onChange={() => handleToggle(node.id, 'isFood')}
                                            color="primary"
                                        />
                                    }
                                    label="是否是菜品"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={node.isHidden}
                                            onChange={() => handleToggle(node.id, 'isHidden')}
                                            color="primary"
                                        />
                                    }
                                    label="是否隐藏"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={node.isNew}
                                            onChange={() => handleToggle(node.id, 'isNew')}
                                            color="primary"
                                        />
                                    }
                                    label="是否是新品"
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default AdminPage;
