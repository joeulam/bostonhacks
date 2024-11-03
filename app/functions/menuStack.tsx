import { Stack, Button, Grid, Box } from "@mantine/core";
import { Notifications, notifications } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";
import "../styles.css"; // Import your styles
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

export function listOfItem() {
  return item;
}

export function Menu({ diningHall, addToCart } : any) {
  const [count, setCount] = useState<string[]>([]);
  const items = require(`../functions/json/food_items_${diningHall}.json`); 

  function handleAddToCart(itemName: string) {
    notifications.show({
      title: "Added " + itemName + " to cart",
      message: "",
    });
    setCount((prev) => [...prev, itemName]); // Add new string to the array
    addToCart(itemName); // Call the addToCart function passed from Home
  }

  return (
    <MantineProvider defaultColorScheme="dark">
      <Stack align="stretch" justify="center" gap="md">
        <Notifications />
        <div className="grid-container">
          <Grid>
            {items.map((item: foodItems) => (
              <Grid.Col span={12} key={item.id}>
                <Box className="food-item">
                  <span>{item.id}</span>
                  <Button variant="default" onClick={() => handleAddToCart(item.id)}>
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
