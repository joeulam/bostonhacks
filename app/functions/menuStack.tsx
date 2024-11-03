import { Stack, Button, Grid, Box } from "@mantine/core";
import { Notifications, notifications } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";
import React from "react";

interface foodItems {
  id: string; // Converted to string
  calories: number;
  total_fat: number;
  saturated_fat: number;
  trans_fat: number;
  cholesterol: number;
  sodium: number;
  total_carbohydrate: number;
  dietary_fiber: number;
  sugars: number;
  protein: number;
}

interface MenuProps {
  addToCart: (itemName: string) => void; // Define the prop type
}

export function Menu({ addToCart }: MenuProps) {
  const items = require("../functions/food_items_marci.json"); // Adjust the path based on your structure

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
                  <Button variant="default" onClick={() => addToCart(item.id)}>
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
