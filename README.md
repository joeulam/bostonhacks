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

## FAQ
- **What do `mongodb.tsx` and `writeToDb.py` do?**
  - These are two helper files that assist in updating the MongoDB data. The MongoDB instance runs on Google Colab and is updated every 8 hours. 
  - **`writeToDb.py`**: This script writes the data from MongoDB into JSON files that can be parsed by the application.
  - **`mongodb.tsx`**: This TypeScript file handles the connection to MongoDB and ensures data retrieval for the Next.js app.

- **What do `calculate.tsx`, `menuStack.tsx`, and `page.tsx` do?**
  - These are the main three files that control the logic of the program.
  - **`page.tsx`**: This file is the main entry point that displays both calculation data and `menuStack` data using tabs.
  - **`calculate.tsx`**: This file manages the calculation logic and allows for data processing within the application.
  - **`menuStack.tsx`**: This file displays menu options in a stack format, providing a user interface for viewing the menu data.