import requests
from bs4 import BeautifulSoup
from datetime import date
import json
import re

today = str(date.today())

def get_items(location):
    # The ______ dining hall website
    if location == 'fenway':
        return get_fenway()
    else:
        url = 'https://www.bu.edu/dining/location/' + location + '/#menu'
        page = requests.get(url)

        if page.status_code != 200:
            print(f"Failed to retrieve data from {url}. Status code: {page.status_code}")
            return False

        # Parse the HTML content
        soup = BeautifulSoup(page.content, 'html.parser')

        # Prepare a dictionary to hold food items for all meal types
        food_info = []

        # Iterate through meal times you want to check
        meal_times = ['breakfast', 'lunch', 'dinner']
        for meal_time in meal_times:
            food = soup.find('li', id=f'{today}-{meal_time}')
            if food is not None:
                food_title = food.find_all('h3', class_='nutrition-title')

                for item in food_title:
                    # Separates food section into lists: one for nutrient labels, and the other for amounts of each nutrient
                    nutrient_list = item.parent.find_next('div', class_='nutrition-facts-half').find_all('td', class_='nutrition-label-nutrient')
                    amount_list = item.parent.find_next('div', class_='nutrition-facts-half').find_all('td', class_='nutrition-label-amount')

                    if len(nutrient_list) == 14:
                        food_dict = {"id": item.get_text()[:-16]}

                        for nutrient, amount in zip(nutrient_list, amount_list):
                            label = nutrient.get_text()
                            value = amount.get_text().replace("g", "").replace("m", "").strip()
                            food_dict[label] = float(value)
                        
                        food_info.append(food_dict)
            else:
                print(f"No food items found on {today}'s {meal_time} schedule at {location}.")

        print("Success!  " + location + "'s food items have been received!")
        return food_info
                
def get_fenway():
    # The ____ Dining Hall website
    url = 'https://menus.sodexomyway.com/BiteMenu/Menu?menuId=34476&locationId=31992001&whereami=https://bufenway.sodexomyway.com/dining-near-me/campus-center-dining-room'
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')

    # Find the script tag containing the JSON data
    script_tag = soup.find('script', type='text/javascript')
    script_str = script_tag.string
    match = re.search(r'var nd = (\[.*?\]);', script_str, re.DOTALL)

    if match:
        json_string = match.group(1)  # Extract the JSON part from the match
        try:
            json_data = json.loads(json_string)  # Load the JSON data

            # Prepare a dictionary to hold food items for all meal types
            food_info = []

            # Iterate through meal times you want to check
            specific_date = today + 'T00:00:00'  # Change this to the desired date
            meal_times = ['BREAKFAST', 'LUNCH', 'DINNER']
            
            for meal_type in meal_times:
                # Use list comprehension to filter by date, then meal type
                filtered_items = [
                    item
                    for day in json_data if day['date'] == specific_date
                    for day_part in day['dayParts'] if day_part['dayPartName'] == meal_type
                    for course in day_part['courses']
                    for item in course['menuItems']
                ]

                # Process the filtered items
                for item in filtered_items:
                    # Create a food dictionary with default values for each nutrient
                    food_dict = {
                        'id': item.get('formalName', ''),
                        'Calories': item.get('calories', '0').replace("g", "").strip(),
                        'Total Fat': item.get('fat', '0').replace("g", "").strip(),
                        'Saturated Fat': item.get('saturatedFat', '0').replace("g", "").strip(),
                        'Trans Fat': item.get('transFat', '0').replace("g", "").strip(),
                        'Cholesterol': item.get('cholesterol', '0').replace("mg", "").strip(),
                        'Sodium': item.get('sodium', '0').replace("mg", "").strip(),
                        'Total Carbohydrate': item.get('carbohydrates', '0').replace("g", "").strip(),
                        'Dietary Fiber': item.get('dietaryFiber', '0').replace("g", "").strip(),
                        'Sugars': item.get('sugar', '0').replace("g", "").strip(),
                        'Protein': item.get('protein', '0').replace("g", "").strip()
                    }

                    # Convert values to integers, using 0 as a default for empty strings
                    try:
                        food_dict['Calories'] = float(food_dict['Calories']) if food_dict['Calories'] else 0
                        food_dict['Total Fat'] = float(food_dict['Total Fat']) if food_dict['Total Fat'] else 0
                        food_dict['Saturated Fat'] = float(food_dict['Saturated Fat']) if food_dict['Saturated Fat'] else 0
                        food_dict['Trans Fat'] = float(food_dict['Trans Fat']) if food_dict['Trans Fat'] else 0
                        food_dict['Cholesterol'] = float(food_dict['Cholesterol']) if food_dict['Cholesterol'] else 0
                        food_dict['Sodium'] = float(food_dict['Sodium']) if food_dict['Sodium'] else 0
                        food_dict['Total Carbohydrate'] = float(food_dict['Total Carbohydrate']) if food_dict['Total Carbohydrate'] else 0
                        food_dict['Dietary Fiber'] = float(food_dict['Dietary Fiber']) if food_dict['Dietary Fiber'] else 0
                        food_dict['Sugars'] = float(food_dict['Sugars']) if food_dict['Sugars'] else 0
                        food_dict['Protein'] = float(food_dict['Protein']) if food_dict['Protein'] else 0

                    except ValueError as e:
                        print(f"Error converting nutrients to int: {e}. Skipping item: {food_dict['id']}")
                        continue  # Skip this item if there's an error
                    # Check if all required values are present and not None or empty
                    if all(value is not None and value != '' for value in food_dict.values()):
                        food_info.append(food_dict)
            
            print("Success!  Fenway's food items have been received!")
            return food_info

        except json.JSONDecodeError as e:
            print("Error decoding JSON:", e)
    else:
        print("JSON data not found in the script string.")


def save_to_json(data, filename='marciano_items.json'):
    """Function to save data to a JSON file."""
    with open(filename, 'w') as json_file:
        json.dump(data, json_file, indent=4)
        print(f"Success! Food items saved to '{filename}'.")


# Note: MAKE SURE YOU ARE IN THE HACKATHON/BOSTONHACKS DIRECTORY! 
# get_items(location) 
# locations: warren, granby, fenway, west, marciano

food_info = get_items('marciano')
save_to_json(food_info)