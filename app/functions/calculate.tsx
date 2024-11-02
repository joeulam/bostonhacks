import { Stack, Button } from '@mantine/core';
import { totalval } from '../functions/menuStack'
import { Grid } from '@mantine/core';

export function calculate() {
  return (
    <Stack
      h={300}
      bg="var(--mantine-color-body)"
      align="stretch"
      justify="center"
      gap="md"
    >
        <Grid>
            <Grid.Col span={6}>{totalval()}</Grid.Col>
        </Grid>
        
      
    </Stack>
  );
}