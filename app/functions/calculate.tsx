import { Stack, Button, Card, Text, Table, Grid } from '@mantine/core';
import React, { useState } from "react";

interface CalculateProps {
  cartItems: string[]; // Cart items as props
  removeFromCart: (itemName: string) => void; // Remove function as prop
}

export function Calculate({ cartItems, removeFromCart }: CalculateProps) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [modalOpened, setModalOpened] = useState(false);

  function dynamicList() {
    return cartItems.map((item, index) => (
      <Grid.Col span={6} key={index}>
        <Card onClick={() => handleCardClick(item)}>
          <Text>{item}</Text>
          <Button fullWidth onClick={(e) => { e.stopPropagation(); removeFromCart(item); }}>
            Remove Item
          </Button>
        </Card>
      </Grid.Col>
    ));
  }

  function handleCardClick(item: string) {
    setSelectedItem(item);
    setModalOpened(true);
  }

  return (
    <Stack>
      <div className="item-container">
        <Grid>
          {dynamicList()}
        </Grid>
      </div>

      {modalOpened && (
        <div className="custom-modal">
          <Card>
            <Text>{selectedItem}</Text>
            {/* Other modal content */}
            <Button onClick={() => setModalOpened(false)}>Close</Button>
          </Card>
        </div>
      )}
    </Stack>
  );
}
