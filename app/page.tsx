"use client";
import { MantineProvider } from "@mantine/core";
import { IconChefHat } from "@tabler/icons-react";
import { Tabs } from "@mantine/core";
import "@mantine/core/styles.css";
import { Menu } from "../app/functions/menuStack"; // Adjust the import if necessary
import "@mantine/notifications/styles.css";
import "./styles.css";
import { Calculate } from "./functions/calculate";
import { IconCalculator } from "@tabler/icons-react";
import React, { useState } from "react";

export default function Home() {
  const [cartItems, setCartItems] = useState<string[]>([]); // State to manage cart items

  const addToCart = (item : string) => {
    setCartItems((prevItems) => [...prevItems, item]); // Function to add item to cart
  };

  const removeFromCart = (index : number) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  return (
    <MantineProvider defaultColorScheme="dark">
      <Tabs defaultValue="West_Dining_hall">
        <Tabs.List>
          <Tabs.Tab value="West_Dining_hall" leftSection={<IconChefHat />}>
            West Dining Hall
          </Tabs.Tab>
          <Tabs.Tab value="Warren_Dining_hall" leftSection={<IconChefHat />}>
            Warren Dining Hall
          </Tabs.Tab>
          <Tabs.Tab value="Marci_Dining_hall" leftSection={<IconChefHat />}>
            Marci Dining Hall
          </Tabs.Tab>
          <Tabs.Tab value="Fenway_Dining_hall" leftSection={<IconChefHat />}>
            Fenway Dining Hall
          </Tabs.Tab>
          <Tabs.Tab value="Calculate" leftSection={<IconCalculator />}>
            Calculate
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="West_Dining_hall">Menu</Tabs.Panel>
        <Tabs.Panel value="Warren_Dining_hall">Menu</Tabs.Panel>
        <Tabs.Panel value="Marci_Dining_hall">
          <Menu diningHall="marci" addToCart={addToCart} /> {/* Pass addToCart to Menu */}
        </Tabs.Panel>
        <Tabs.Panel value="Fenway_Dining_hall">Menu</Tabs.Panel>
        <Tabs.Panel value="Calculate">
          <Calculate cartItems={cartItems} removeFromCart={removeFromCart} />
        </Tabs.Panel>
      </Tabs>
    </MantineProvider>
  );
}
