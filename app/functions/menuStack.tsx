import { Stack, Button } from '@mantine/core';
import { Grid } from '@mantine/core';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';
import { notifications } from '@mantine/notifications';

export function menu() {

    function addToCart(){
        notifications.show({
            title: 'Added to cart',
            message: '',
            })
    }


  return (
    
    <Stack
      h={300}
      bg="var(--mantine-color-body)"
      align="stretch"
      justify="center"
      gap="md"
    >
    <Notifications />
        <div>
            <Grid>
                <Grid.Col span={6}>Temp food blah blah blah</Grid.Col>
                <Grid.Col span={2}>            
                    <Button variant="default" onClick={() =>addToCart()}>
                        Add
                    </Button>
                </Grid.Col>
            </Grid>
        </div>
        <div>
            <Grid>
                <Grid.Col span={6}>Temp food blah blah blah</Grid.Col>
                <Grid.Col span={2}>            
                    <Button variant="default" onClick={() =>addToCart()}>Add</Button>
                </Grid.Col>
            </Grid>
        </div>
        <div>
            <Grid>
                <Grid.Col span={6}>Temp food blah blah blah</Grid.Col>
                <Grid.Col span={2}>            
                    <Button variant="default" onClick={() =>addToCart()}>Add</Button>
                </Grid.Col>
            </Grid>
        </div>
    </Stack>
  );
}