'use client';
import { Stack, Button, Card, Text } from '@mantine/core';
import { Grid } from '@mantine/core';
import React from "react";
import { listOfItem } from '../functions/menuStack';
import '../styles.css'; // Import your CSS file

export function Calculate() {
    const items = listOfItem();

    function dynamicList() {
        return items.map((item, index) => (
            <Grid.Col span={6} key={index}>
                <Card className="item-card">
                    <Text className="item-title">
                        {item} {/* Directly using the item value */}
                    </Text>
                    <Text className="item-description">
                        Description not available. {/* Placeholder for description */}
                    </Text>
                    <Button className="item-button" fullWidth>
                        Remove Item
                    </Button>
                </Card>
            </Grid.Col>
        ));
    }

    return (
        <Stack
            h={300}
            bg="var(--mantine-color-body)"
            align="stretch"
            justify="center"
            gap="md"
        >
            <div className="item-container">
                <Grid>
                    {dynamicList()}
                </Grid>
            </div>
        </Stack>
    );
}
