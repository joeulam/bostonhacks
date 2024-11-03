'use client';
import { Stack, Button, Card, Text, Table, Grid } from '@mantine/core';
import React, { useState } from "react";
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
    const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
    const [modalOpened, setModalOpened] = useState(false); 

    function dynamicList() {
        return cartItems.map((item, index) => (
            <Grid.Col span={6} key={index}>
                <Card className="item-card" onClick={() => handleCardClick(item)}>
                    <Text className="item-title">{item}</Text>
                    <Text className="item-description">Description not available.</Text>
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
                                    <th>Property</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>Calories</td><td>{selectedItem.Calories}</td></tr>
                                <tr><td>Total Fat</td><td>{selectedItem['Total Fat']}</td></tr>
                                <tr><td>Saturated Fat</td><td>{selectedItem['Saturated Fat']}</td></tr>
                                <tr><td>Trans Fat</td><td>{selectedItem['Trans Fat']}</td></tr>
                                <tr><td>Cholesterol</td><td>{selectedItem.Cholesterol}</td></tr>
                                <tr><td>Sodium</td><td>{selectedItem.Sodium}</td></tr>
                                <tr><td>Total Carbohydrates</td><td>{selectedItem['Total Carbohydrate']}</td></tr>
                                <tr><td>Dietary Fiber</td><td>{selectedItem['Dietary Fiber']}</td></tr>
                                <tr><td>Sugars</td><td>{selectedItem.Sugars}</td></tr>
                                <tr><td>Protein</td><td>{selectedItem.Protein}</td></tr>
                            </tbody>
                        </Table>
                        <Button className="close-button" onClick={() => setModalOpened(false)}>Close</Button>
                    </Card>
                </div>
            )}
        </Stack>
    );
}
