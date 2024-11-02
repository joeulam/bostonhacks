"use client";
import { Stack, Button, Card, Text } from "@mantine/core";
import { Grid } from "@mantine/core";
import React, { useState, useEffect } from "react";
import { listOfItem } from "../functions/menuStack";
import "../styles.css"; // Import your CSS file
import { MantineProvider } from "@mantine/core";

export function Calculate() {
  const [items, setItems] = useState<string[]>(listOfItem);

  // Effect to check for new data added to `listOfItem`
  useEffect(() => {
    const checkForNewData = () => {
      if (listOfItem.length !== items.length) {
        console.log("New data detected. Updating items...");
        setItems([...listOfItem()]);
      }
    };

    // Set an interval to check for updates every 2.5 seconds
		// FIND A DIFFERENT WAY HURTS PERFORMANCE
    const intervalId = setInterval(checkForNewData, 2500);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [items]);

  function removeFromList(index: number) {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    console.log("Updated Items:", updatedItems);
    delete items[index]; // This line has no effect; consider removing it
  }

  function dynamicList() {
    return items.map((item, index) => (
      <Grid.Col span={6} key={index}>
        <Card className="item-card">
          <Text className="item-title">{item}</Text>
          <Text className="item-description">Description not available.</Text>
          <Button className="item-button" fullWidth onClick={() => removeFromList(index)}>
            Remove Item
          </Button>
        </Card>
      </Grid.Col>
    ));
  }

  return (
    <MantineProvider defaultColorScheme="dark">
      <Stack h={300} bg="var(--mantine-color-body)" align="stretch" justify="center" gap="md">
        <div className="item-container">
          <Grid>{dynamicList()}</Grid>
        </div>
      </Stack>
    </MantineProvider>
  );
}
