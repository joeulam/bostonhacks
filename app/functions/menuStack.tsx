import { Stack, Button, Grid, Box } from '@mantine/core';
import '@mantine/notifications/styles.css';
import { Notifications, notifications } from '@mantine/notifications';
import '../styles.css'; // Import your styles

export function menu() {
  function addToCart() {
    notifications.show({
      title: 'Added to cart',
      message: '',
    });
  }

  const items = [
    { id: 1, label: 'Temp food 1' },
    { id: 2, label: 'Temp food 2' },
    { id: 3, label: 'Temp food 3' },
  ];

  return (
    <Stack align="stretch" justify="center" gap="md">
      <Notifications />
      <div className="grid-container">
        <Grid>
          {items.map((item) => (
            <Grid.Col span={12} key={item.id}> {/* Use span={12} for full width */}
              <Box className="food-item">
                <span>{item.label}</span>
                <Button variant="default" onClick={addToCart}>
                  Add
                </Button>
              </Box>
            </Grid.Col>
          ))}
        </Grid>
      </div>
    </Stack>
  );
}
