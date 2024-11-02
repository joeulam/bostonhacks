import { Stack, Button, Grid, Box } from '@mantine/core';
import '@mantine/notifications/styles.css';
import { Notifications, notifications } from '@mantine/notifications';
import {MantineProvider } from '@mantine/core';

import '../styles.css'; // Import your styles
import React, { useState } from "react";

const item: string[] = [];

interface foodItems {
    id: string; // Converted to string
    calories: number; // Changed to lowercase
    total_fat: number; // Renamed with underscore
    saturated_fat: number; // Renamed with underscore
    trans_fat: number; // Renamed with underscore
    cholesterol: number; // Renamed with lowercase
    sodium: number; // Renamed with lowercase
    total_carbohydrate: number; // Renamed with underscore
    dietary_fiber: number; // Renamed with underscore
    sugars: number; // Renamed with lowercase
    protein: number; // Renamed with lowercase
}

export function listOfItem(){
    console.log(item)
    return item
}

export function Menu() {
    const [count, setCount] = useState<string[]>([]);
    const items = require('../functions/food_items.json');

    function addToCart(itemName: string) {
        notifications.show({
            title: 'Added ' + itemName + ' to cart',
            message: '',
        });
        // Append the new item to the existing array in state
        setCount(prev => [...prev, itemName]); // Add new string to the array
        item.push(itemName)
    }

  return (
    <MantineProvider defaultColorScheme="dark">
        <Stack align="stretch" justify="center" gap="md">
        <Notifications />
        <div className="grid-container">
                <Grid>
                    {console.log(items as foodItems)}
                {items.map((item : foodItems) => (
                <Grid.Col span={12} key={item.id}> {/* Use span={12} for full width */}
                <Box className="food-item">
                    <span>{item.id}</span>
                    <Button variant="default" onClick={ () => addToCart(item.id)}>
                    Add
                    </Button>
                </Box>
                </Grid.Col>
            ))}
                </Grid>
            </div>
        </Stack>
    </MantineProvider>
  );

}
