'use client'
import { Stack, Button } from '@mantine/core';
import { Grid } from '@mantine/core';
import React, { useState } from "react";
import { listOfItem } from '../functions/menuStack';

export function Calculate() {
    const items = listOfItem()
    
    function dynamicList(){
        return(items.map((number) =>
            <Grid.Col span={6}>{number}</Grid.Col>
          )
        )
    }
    
  return (
    <Stack
      h={300}
      bg="var(--mantine-color-body)"
      align="stretch"
      justify="center"
      gap="md"
    >
        <Grid>
            {dynamicList()}
        </Grid>
      
    </Stack>
  );
}