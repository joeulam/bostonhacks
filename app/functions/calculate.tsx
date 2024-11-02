'use client';
import { Stack, Button, Card, Text, Table } from '@mantine/core';
import { Grid } from '@mantine/core';
import React, { useState } from "react";
import { listOfItem } from '../functions/menuStack';
import '../styles.css'; // Import your CSS file

export function Calculate() {
    const [items, setItems] = useState(listOfItem()); // Store items in state
    const [selectedItem, setSelectedItem] = useState(null); 
    const [modalOpened, setModalOpened] = useState(false); 

    function dynamicList() {
        return items.map((item, index) => (
            <Grid.Col span={6} key={index}>
                <Card className="item-card" onClick={() => handleCardClick(item)}>
                    <Text className="item-title">{item}</Text>
                    <Text className="item-description">Description not available.</Text>
                    <Button className="item-button" fullWidth onClick={(e) => { e.stopPropagation(); removeFromList(item); }}>
                        Remove Item
                    </Button>
                </Card>
            </Grid.Col>
        ));
    }

    function handleCardClick(item) {
        setSelectedItem(item); // Set the selected item for modal
        setModalOpened(true); // Open the modal
    }

    function removeFromList(itemName) {
        setItems(prevItems => prevItems.filter(item => item !== itemName)); // Remove item from the list
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
            {modalOpened && (
                <div className="custom-modal">
                    <Card className="item-card large-card" style={{ maxHeight: '35vh', overflow: 'auto' }}>
                        <Text className="large-item-title">{selectedItem}</Text>
                        
                        {/* Table for detailed data */}
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Property</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Replace with actual data */}
                                <tr>
                                    <td>Total Fat</td>
                                    <td>Ex1</td>
                                </tr>
                                <tr>
                                    <td>Saturated Fat</td>
                                    <td>Ex2</td>
                                </tr>
                                <tr>
                                    <td>Trans Fat</td>
                                    <td>Ex3</td>
                                </tr>
                                <tr>
                                    <td>Cholesterol</td>
                                    <td>Ex4</td>
                                </tr>
                                <tr>
                                    <td>Sodium</td>
                                    <td>Ex5</td>
                                </tr>
                                <tr>
                                    <td>Total Carbohydrates</td>
                                    <td>Ex6</td>
                                </tr>
                                <tr>
                                    <td>Dietary Fiber</td>
                                    <td>Ex7</td>
                                </tr>
                                <tr>
                                    <td>Sugars</td>
                                    <td>Ex8</td>
                                </tr>
                                <tr>
                                    <td>Protein</td>
                                    <td>Ex9</td>
                                </tr>
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
