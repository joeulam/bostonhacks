'use client';
import { Stack, Button, Card, Text, Table, Grid } from '@mantine/core';
import React, { useState, useEffect } from "react";
import '../styles.css'; // Import your CSS file

interface CalculateProps {
  cartItems: string[]; // Cart items as props
  removeFromCart: (itemName: number) => void; // Remove function as prop
}

// Define the type for the food items based on your JSON structure
interface FoodItem {
  id: string;
  Calories: number;
  'Total Fat': number;
  'Saturated Fat': number;
  'Trans Fat': number;
  Cholesterol: number;
  Sodium: number;
  'Total Carbohydrate': number;
  'Dietary Fiber': number;
  Sugars: number;
  Protein: number;
}

// Use require to load the JSON data
const items: FoodItem[] = require('../functions/food_items_marci.json');

export function Calculate({ cartItems, removeFromCart }: CalculateProps) {
  const [caloriesMap, setCaloriesMap] = useState<{ [key: string]: number }>({}); // State for calories
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const [modalOpened, setModalOpened] = useState(false); 

  // Initialize caloriesMap when cartItems change
  useEffect(() => {
    const initialCaloriesMap: { [key: string]: number } = {};
    cartItems.forEach(item => {
      const foodItem = items.find(dataItem => dataItem.id.trim() === item.trim());
      if (foodItem) {
        initialCaloriesMap[item] = foodItem.Calories;
      }
    });
    setCaloriesMap(initialCaloriesMap);
  }, [cartItems]);

  function dynamicList() {
    return cartItems.map((item, index) => (
      <Grid.Col span={6} key={index}>
        <Card className="item-card" onClick={() => handleCardClick(item)}>
          <Text className="item-title">{item}</Text>
          <Text className="item-description">
            {caloriesMap[item] !== undefined ? `Calories: ${caloriesMap[item]} kcal` : 'Loading...'}
          </Text>
          <Button className="item-button" fullWidth onClick={(e) => { e.stopPropagation(); removeFromCart(index); }}>
            Remove Item
          </Button>
        </Card>
      </Grid.Col>
    ));
  }

  function handleCardClick(itemName: string) {
    const item = items.find((dataItem) => dataItem.id.trim() === itemName.trim());
    if (item) {
      setSelectedItem(item); // Set the selected item for modal
      setModalOpened(true); // Open the modal
    }
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

      {/* Custom modal as a div */}
      {modalOpened && selectedItem && (
        <div className="custom-modal">
          <Card className="item-card large-card" style={{ maxHeight: '35vh', overflow: 'auto' }}>
            <Text className="large-item-title">{selectedItem.id.trim()}</Text>
            <Table striped>
              <thead>
                <tr>
                  <th>Nutrition Facts</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Calories</td><td>{selectedItem.Calories} kcal</td></tr>
                <tr><td>Total Fat</td><td>{selectedItem['Total Fat']} g</td></tr>
                <tr><td>Saturated Fat</td><td>{selectedItem['Saturated Fat']} g</td></tr>
                <tr><td>Trans Fat</td><td>{selectedItem['Trans Fat']} g</td></tr>
                <tr><td>Cholesterol</td><td>{selectedItem.Cholesterol} mg</td></tr>
                <tr><td>Sodium</td><td>{selectedItem.Sodium} mg</td></tr>
                <tr><td>Total Carbohydrates</td><td>{selectedItem['Total Carbohydrate']} g</td></tr>
                <tr><td>Dietary Fiber</td><td>{selectedItem['Dietary Fiber']} g</td></tr>
                <tr><td>Sugars</td><td>{selectedItem.Sugars} g</td></tr>
                <tr><td>Protein</td><td>{selectedItem.Protein} g</td></tr>
              </tbody>
            </Table>
            <div className="button-container">
              <Button className="close-button" onClick={() => setModalOpened(false)}>Close</Button>
            </div>
          </Card>
        </div>
      )}
    </Stack>
  );
}
