import Image from "next/image";
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  /** Put your mantine theme override here */
});
export default function Home() {
  return (
    <MantineProvider theme={theme}>
    {/* Your app here */}
  </MantineProvider>
  );
}
