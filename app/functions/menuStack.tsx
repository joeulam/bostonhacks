import { Stack, Button, Grid, Box } from '@mantine/core';
import '@mantine/notifications/styles.css';
import { Notifications, notifications } from '@mantine/notifications';

import '../styles.css'; // Import your styles
import React, { useState } from "react";

const item: string[] = [];

export function listOfItem(){
    console.log(item)
    return item
}

export function Menu() {
    const [count, setCount] = useState<string[]>([]);
    const items = [
        { id: 1, label: 'Temp food 1' },
        { id: 2, label: 'Temp food 2' },
        { id: 3, label: 'Temp food 3' },
    ];

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

    <Stack align="stretch" justify="center" gap="md">
    <Notifications />
      <div className="grid-container">
            <Grid>
               {items.map((item) => (
            <Grid.Col span={12} key={item.id}> {/* Use span={12} for full width */}
              <Box className="food-item">
                <span>{item.label}</span>
                <Button variant="default" onClick={ () => addToCart(item.label)}>
                  Add
                </Button>
              </Box>
            </Grid.Col>
          ))}
            </Grid>
        </div>
    </Stack>
  );

}
