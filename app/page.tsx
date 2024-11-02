'use client'
import Image from "next/image";
import { createTheme, MantineProvider } from '@mantine/core';
import { NavLink } from '@mantine/core';
import '@mantine/core/styles.css';
import { IconChefHat } from '@tabler/icons-react'
import { Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export default function Home() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <MantineProvider defaultColorScheme="dark">
      <div>
        <h1>BU Fit tracker</h1>
        <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" />
      </div>
      <NavLink
        href="#required-for-focus"
        label="West Dining hall"
        leftSection={<IconChefHat size="1rem" stroke={1.5} />}
      />
    </MantineProvider>
  );
}
