import requests
from bs4 import BeautifulSoup
from datetime import date
import json
import re

today = str(date.today())
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
        # Specify the meal type and date you want to filter by
        meal_type = 'LUNCH'  # Change this to the desired meal type
        specific_date = today + 'T00:00:00'  # Change this to the desired date

        # Use list comprehension to filter by date, then meal type
        filtered_items = [
            item
            for day in json_data if day['date'] == specific_date
            for day_part in day['dayParts'] if day_part['dayPartName'] == meal_type
            for course in day_part['courses']
            for item in course['menuItems']
        ]
    except json.JSONDecodeError as e:
        print("Error decoding JSON:", e)
    food_info = []
    # Print or process the filtered items
    for item in filtered_items:
        food_dict = {}
        food_dict['id'] = item['formalName']
        food_dict['Calories'] = item['calories'] 
        food_dict['Total Fat'] = item['fat']
        food_dict['Saturated Fat'] = item['saturatedFat'] 
        food_dict['Trans Fat'] = item['transFat']
        food_dict['Cholesterol'] = item['cholesterol']
        food_dict['Sodium'] = item['sodium']
        food_dict['Total Carbohydrate'] = item['carbohydrates']
        food_dict['Dietary Fiber'] = item['dietaryFiber']
        food_dict['Sugars'] = item['sugar']
        food_dict['Protein'] = item['protein']
        food_info.append(food_dict)
    print(food_info)
        
else:
    print("JSON data not found in the script string.")
