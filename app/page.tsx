import Image from "next/image";
import { createTheme, MantineProvider } from '@mantine/core';
import { NavLink } from '@mantine/core';
import '@mantine/core/styles.css';


export default function Home() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <div>
        <h1>BU Fit tracker</h1>
        
      </div>
      <NavLink
        href="#required-for-focus"
        label="With icon"
      />
    </MantineProvider>
  );
}
