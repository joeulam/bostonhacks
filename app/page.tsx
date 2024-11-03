"use client";
import { MantineProvider } from "@mantine/core";
import { IconChefHat } from "@tabler/icons-react";
import { Tabs } from "@mantine/core";
import "@mantine/core/styles.css";
import { Menu } from "../app/functions/menuStack"; // Adjust the import if necessary
import "@mantine/notifications/styles.css";
import "./styles.css"; // Make sure this imports your CSS
import { Calculate } from "./functions/calculate";
import { IconCalculator } from "@tabler/icons-react";
import React, { useState } from "react";

export default function Home() {
  const [cartItems, setCartItems] = useState<string[]>([]); // State to manage cart items

  const addToCart = (item: string) => {
    setCartItems((prevItems) => [...prevItems, item]); // Function to add item to cart
  };

  const removeFromCart = (index: number) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  fetch('/api/server.js')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.error('Error:', err));

  return (
    <MantineProvider defaultColorScheme="dark">
      <div style={{
        height: "100vh", // Ensure the wrapper takes full viewport height
        backgroundImage: "url('./media/fenway.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
        <Tabs defaultValue="West_Dining_hall" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '10px' }}>
          <Tabs.List>
            <Tabs.Tab value="West_Dining_hall" leftSection={<IconChefHat />}>West</Tabs.Tab>
            <Tabs.Tab value="Warren_Dining_hall" leftSection={<IconChefHat />}>Warren</Tabs.Tab>
            <Tabs.Tab value="Marci_Dining_hall" leftSection={<IconChefHat />}>Marci</Tabs.Tab>
            <Tabs.Tab value="Fenway_Dining_hall" leftSection={<IconChefHat />}>Fenway</Tabs.Tab>
            <Tabs.Tab value="Granby's_Dining_hall" leftSection={<IconChefHat />}>Granby's</Tabs.Tab>
            <Tabs.Tab value="Calculate" leftSection={<IconCalculator />}>Calculate</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="West_Dining_hall">
              <div className="food-items-container">
                  <Menu diningHall="west" addToCart={addToCart} />
              </div>
          </Tabs.Panel>
          <Tabs.Panel value="Warren_Dining_hall">
              <div className="food-items-container">
                  <Menu diningHall="warren" addToCart={addToCart} />
              </div>
          </Tabs.Panel>
          <Tabs.Panel value="Marci_Dining_hall">
              <div className="food-items-container">
                  <Menu diningHall="marci" addToCart={addToCart} />
              </div>
          </Tabs.Panel>
          <Tabs.Panel value="Fenway_Dining_hall">
              <div className="food-items-container">
                  <Menu diningHall="fenway" addToCart={addToCart} />
              </div>
          </Tabs.Panel>
          <Tabs.Panel value="Granby's_Dining_hall">
              <div className="food-items-container">
                  <Menu diningHall="granby" addToCart={addToCart} />
              </div>
          </Tabs.Panel>
          
          <Tabs.Panel value="Calculate">
            <Calculate cartItems={cartItems} removeFromCart={removeFromCart} />
          </Tabs.Panel>
        </Tabs>
      </div>
    </MantineProvider>
  );
}