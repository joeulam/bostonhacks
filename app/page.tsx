'use client'
import {MantineProvider } from '@mantine/core';
import { IconChefHat } from '@tabler/icons-react'
import { Tabs } from '@mantine/core';
import '@mantine/core/styles.css';
import {menu} from '../app/functions/menuStack'
import '@mantine/notifications/styles.css';

export default function Home() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <div>
        <h1>BU Fit tracker</h1>
      </div>
      <Tabs defaultValue="West_Dining_hall">
        <Tabs.List>
          <Tabs.Tab value="West_Dining_hall" leftSection={<IconChefHat/>}>
            West Dining hall
          </Tabs.Tab>
          <Tabs.Tab value="Warren_Dining_hall" leftSection={<IconChefHat/>}>
            Warren Dining hall
          </Tabs.Tab>
          <Tabs.Tab value="Marci_Dining_hall" leftSection={<IconChefHat/>}>
            Marci Dining hall
          </Tabs.Tab>
          <Tabs.Tab value="Fenway_Dining_hall" leftSection={<IconChefHat/>}>
            Fenway Dining hall
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="West_Dining_hall">
          {menu()}
        </Tabs.Panel>
        <Tabs.Panel value="Warren_Dining_hall">
          Menu
        </Tabs.Panel>
        <Tabs.Panel value="Marci_Dining_hall">
          Menu
        </Tabs.Panel>
        <Tabs.Panel value="Fenway_Dining_hall">
          Menu
        </Tabs.Panel>
      </Tabs>
    </MantineProvider>
  );
}
