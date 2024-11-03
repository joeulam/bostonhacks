# BUFT - BU Food Tracker

## Overview
BUFT (Boston University Food Tracker) is a Next.js web application that allows students to explore food options available in various dining halls at Boston University. Users can browse items, add them to a virtual cart, and view or calculate total nutritional information for the selected items. This project combines the power of React, TypeScript, and the Mantine library to create an interactive and visually appealing user experience.

## Features
- **Interactive Tabs Navigation**: Explore different dining halls using tabs.
- **Dynamic Menu**: Load menus from JSON data specific to each dining hall.
- **Cart Functionality**: Add or remove food items and view their nutritional content.
- **Nutritional Calculation**: Calculate the total nutritional values of items in the cart.
- **Modals**: View detailed nutrition facts in a modal window.
- **Notifications**: Receive notifications when items are added to the cart.

## Technology Stack
- **Framework**: Next.js
- **Language**: TypeScript
- **UI Library**: Mantine
- **Icons**: Tabler Icons
- **CSS**: Custom styling and Mantine default theme

## File Structure
BUFT/
│
├── app/
│   ├── functions/
│   │   ├── json/
│   │   │   ├── food_items_marci.json
│   │   │   ├── food_items_granby.json
│   │   │   ├── food_items_fenway.json
│   │   │   ├── food_items_warren.json
│   │   │   └── food_items_west.json
│   │   ├── menuStack.tsx
│   │   └── writeToDb.py
│   ├── Home.tsx
│   └── mongodb.tsx
│
├── public/
│   └── media/
│       └── fenway.jpg
│
├── styles/
│   └── styles.css
│
├── components/
│   └── Calculate.tsx
│
├── README.md
└── package.json

 