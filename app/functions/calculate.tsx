'use client';
import { Stack, Button, Card, Text, Table, Grid } from '@mantine/core';
import React, { useState, useEffect } from "react";
import '../styles.css'; // Import your CSS file

interface CalculateProps {
  cartItems: string[]; // Cart items as props
  removeFromCart: (itemIndex: number) => void; // Remove function as prop
}

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

// Load food items from JSON files
const itemSources = [
  require(`../functions/json/food_items_marci.json`),
  require(`../functions/json/food_items_granby.json`),
  require(`../functions/json/food_items_fenway.json`),
  require(`../functions/json/food_items_warren.json`),
  require(`../functions/json/food_items_west.json`),
];

const allItems = itemSources.flat();

export function Calculate({ cartItems, removeFromCart }: CalculateProps) {
  const [caloriesMap, setCaloriesMap] = useState<{ [key: string]: number }>({});
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const [modalOpened, setModalOpened] = useState(false); 
  const [nutritionInfo, setNutritionInfo] = useState<{ totalCalories: number; totalFat: number; totalSaturatedFat: number; totalTransFat: number; totalCholesterol: number; totalSodium: number; totalCarbohydrates: number; totalDietaryFiber: number; totalSugars: number; totalProtein: number; } | null>(null);
  const [infoModalOpened, setInfoModalOpened] = useState(false);

  useEffect(() => {
    const initialCaloriesMap: { [key: string]: number } = {};
    cartItems.forEach(item => {
      const foodItem = allItems.find((dataItem) => dataItem.id.trim() === item.trim());
      if (foodItem) {
        initialCaloriesMap[item] = foodItem.Calories; // Store actual calorie values
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
    const item = allItems.find((dataItem) => dataItem.id.trim() === itemName.trim());
    if (item) {
      setSelectedItem(item);
      setModalOpened(true);
    } else {
      console.error(`Item not found: ${itemName}`);
    }
  }

  const handleCalculate = () => {
    const totals = {
      totalCalories: 0,
      totalFat: 0,
      totalSaturatedFat: 0,
      totalTransFat: 0,
      totalCholesterol: 0,
      totalSodium: 0,
      totalCarbohydrates: 0,
      totalDietaryFiber: 0,
      totalSugars: 0,
      totalProtein: 0,
    };

    cartItems.forEach(item => {
      const foodItem = allItems.find(dataItem => dataItem.id.trim() === item.trim());
      if (foodItem) {
        totals.totalCalories += foodItem.Calories;
        totals.totalFat += foodItem['Total Fat'];
        totals.totalSaturatedFat += foodItem['Saturated Fat'];
        totals.totalTransFat += foodItem['Trans Fat'];
        totals.totalCholesterol += foodItem.Cholesterol;
        totals.totalSodium += foodItem.Sodium;
        totals.totalCarbohydrates += foodItem['Total Carbohydrate'];
        totals.totalDietaryFiber += foodItem['Dietary Fiber'];
        totals.totalSugars += foodItem.Sugars;
        totals.totalProtein += foodItem.Protein;
      }
    });

    // Set nutrition info to display in the modal
    setNutritionInfo(totals);
    setInfoModalOpened(true);
  };

  return (
    <Stack
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

      {/* Button container for centering */}
      <div className="button-container">
        <Button
          onClick={handleCalculate}
          variant="outline"
          className="calculate-button"
        >
          Calculate
        </Button>
      </div>
      
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

    {infoModalOpened && nutritionInfo && (
      <div className="calc-modal">
        <Card className="item-card calc-card" style={{ maxHeight: '40vh', overflow: 'auto', padding: '20px' }}>
          <Text className="large-item-title">Total Nutritional Values</Text>
          <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <Table striped className="calc-table" style={{ margin: '0 auto', width: '60%' }}>
              <thead>
                <tr>
                  <th>Nutritional Facts</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Total Calories</td>
                  <td>{nutritionInfo.totalCalories} kcal</td>
                </tr>
                <tr>
                  <td>Total Fat</td>
                  <td>{nutritionInfo.totalFat} g</td>
                </tr>
                <tr>
                  <td>Saturated Fat</td>
                  <td>{nutritionInfo.totalSaturatedFat} g</td>
                </tr>
                <tr>
                  <td>Trans Fat</td>
                  <td>{nutritionInfo.totalTransFat} g</td>
                </tr>
                <tr>
                  <td>Cholesterol</td>
                  <td>{nutritionInfo.totalCholesterol} mg</td>
                </tr>
                <tr>
                  <td>Sodium</td>
                  <td>{nutritionInfo.totalSodium} mg</td>
                </tr>
                <tr>
                  <td>Total Carbohydrates</td>
                  <td>{nutritionInfo.totalCarbohydrates} g</td>
                </tr>
                <tr>
                  <td>Dietary Fiber</td>
                  <td>{nutritionInfo.totalDietaryFiber} g</td>
                </tr>
                <tr>
                  <td>Sugars</td>
                  <td>{nutritionInfo.totalSugars} g</td>
                </tr>
                <tr>
                  <td>Protein</td>
                  <td>{nutritionInfo.totalProtein} g</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="button-container">
            <Button className="close-button" onClick={() => setInfoModalOpened(false)}>Close</Button>
          </div>
        </Card>
      </div>
    )}
    </Stack>
  );
}
