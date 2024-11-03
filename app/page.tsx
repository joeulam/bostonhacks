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
import React, { useEffect, useState } from "react";
import fetchData from '../app/pages/api/mongodb'; // Adjust the path as necessary
import Script from "next/script";

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
      <Script src="../app/pages/api/mongodb.js"
              strategy="beforeInteractive"/>
      <Tabs defaultValue="West_Dining_hall">
        <Tabs.List>
          <Tabs.Tab value="West_Dining_hall" leftSection={<IconChefHat />}>
            West
          </Tabs.Tab>
          <Tabs.Tab value="Warren_Dining_hall" leftSection={<IconChefHat />}>
            Warren
          </Tabs.Tab>
          <Tabs.Tab value="Marci_Dining_hall" leftSection={<IconChefHat />}>
            Marci
          </Tabs.Tab>
          <Tabs.Tab value="Fenway_Dining_hall" leftSection={<IconChefHat />}>
            Fenway
          </Tabs.Tab>
          <Tabs.Tab value="Granby's_Dining_hall" leftSection={<IconChefHat />}>
            Granby's
          </Tabs.Tab>
          <Tabs.Tab value="Calculate" leftSection={<IconCalculator />}>
            Calculate
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="West_Dining_hall">
          <Menu diningHall="west" addToCart={addToCart} /> {/* Pass addToCart to Menu */}
        </Tabs.Panel>
        <Tabs.Panel value="Warren_Dining_hall">
          <Menu diningHall="warren" addToCart={addToCart} /> {/* Pass addToCart to Menu */}
        </Tabs.Panel>
        <Tabs.Panel value="Marci_Dining_hall">
          <Menu diningHall="marci" addToCart={addToCart} /> {/* Pass addToCart to Menu */}
        </Tabs.Panel>
        <Tabs.Panel value="Fenway_Dining_hall">
          <Menu diningHall="fenway" addToCart={addToCart} /> {/* Pass addToCart to Menu */}
        </Tabs.Panel>
        <Tabs.Panel value="Granby's_Dining_hall">
          <Menu diningHall="granby" addToCart={addToCart} /> {/* Pass addToCart to Menu */}
        </Tabs.Panel>
        <Tabs.Panel value="Calculate">
          <Calculate cartItems={cartItems} removeFromCart={removeFromCart} />
        </Tabs.Panel>
      </Tabs>
    </MantineProvider>
  );
}
