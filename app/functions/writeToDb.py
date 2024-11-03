import requests
from bs4 import BeautifulSoup
from datetime import date
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
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
        meal_times = ['breakfast', 'lunch', 'brunch', 'dinner']
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
            meal_times = ['BREAKFAST', 'LUNCH', 'BRUNCH', 'DINNER']
            
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



def get_databases_fenway():
    # Provide the MongoDB Atlas URL to connect Python to MongoDB using pymongo
    CONNECTION_STRING = "mongodb+srv://joeulam:"+"0707"+"@cluster0.sgvrk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    # Create a connection using MongoClient
    client = MongoClient(CONNECTION_STRING)
    # Create the database for our example
    db = client['fenway']
    food_info = get_items('fenway')
    collection = db['dinner']
    food_info = json.dumps(food_info)
    food_info = json.loads(food_info)
    if isinstance(food_info, list):
        collection.insert_many(food_info)  # Use insert_many if data is a list
    else:
        collection.insert_one(food_info)    # Use insert_one if data is a single document

    print("Data inserted successfully.")
    return client

def get_databases_west():
    # Provide the MongoDB Atlas URL to connect Python to MongoDB using pymongo
    CONNECTION_STRING = "mongodb+srv://joeulam:"+"0707"+"@cluster0.sgvrk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    # Create a connection using MongoClient
    client = MongoClient(CONNECTION_STRING)
    # Create the database for our example
    db = client['west']
    food_info = get_items('west')
    collection = db['dinner']
    food_info = json.dumps(food_info)
    food_info = json.loads(food_info)
    if isinstance(food_info, list):
        collection.insert_many(food_info)  # Use insert_many if data is a list
    else:
        collection.insert_one(food_info)    # Use insert_one if data is a single document
    print("Data inserted successfully.")
    return client

def get_databases_warren():
    # Provide the MongoDB Atlas URL to connect Python to MongoDB using pymongo
    CONNECTION_STRING = "mongodb+srv://joeulam:"+"0707"+"@cluster0.sgvrk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    # Create a connection using MongoClient
    client = MongoClient(CONNECTION_STRING)
    # Create the database for our example
    db = client['warren']
    food_info = get_items('warren')
    collection = db['dinner']
    food_info = json.dumps(food_info)
    food_info = json.loads(food_info)
    if isinstance(food_info, list):
        collection.insert_many(food_info)  # Use insert_many if data is a list
    else:
        collection.insert_one(food_info)    # Use insert_one if data is a single document

    print("Data inserted successfully.")
    return client
    
def get_databases_marciano():
    # Provide the MongoDB Atlas URL to connect Python to MongoDB using pymongo
    CONNECTION_STRING = "mongodb+srv://joeulam:"+"0707"+"@cluster0.sgvrk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    # Create a connection using MongoClient
    client = MongoClient(CONNECTION_STRING)
    # Create the database for our example
    db = client['marciano']
    food_info = get_items('marciano')
    collection = db['dinner']
    food_info = json.dumps(food_info)
    food_info = json.loads(food_info)
    if isinstance(food_info, list):
        collection.insert_many(food_info)  # Use insert_many if data is a list
    else:
        collection.insert_one(food_info)    # Use insert_one if data is a single document

    print("Data inserted successfully.")
    return client

def get_databases_granby():
    # Provide the MongoDB Atlas URL to connect Python to MongoDB using pymongo
    CONNECTION_STRING = "mongodb+srv://joeulam:"+"0707"+"@cluster0.sgvrk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    # Create a connection using MongoClient
    client = MongoClient(CONNECTION_STRING)
    # Create the database for our example
    db = client['granby']
    food_info = get_items('granby')
    collection = db['dinner']
    if food_info is None or (isinstance(food_info, list) and not food_info):
        print("No data to insert. Exiting function.")
        return None  # Do not return the client if there's no data
    food_info = json.dumps(food_info)
    food_info = json.loads(food_info)
    if isinstance(food_info, list):
        collection.insert_many(food_info)  # Use insert_many if data is a list
    else:
        collection.insert_one(food_info)    # Use insert_one if data is a single document

    print("Data inserted successfully.")
    return client

def drop_all_databases():
    # Provide the MongoDB Atlas URL to connect Python to MongoDB using pymongo
    CONNECTION_STRING = "mongodb+srv://joeulam:"+"0707"+"@cluster0.sgvrk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    # Create a connection using MongoClient
    client = MongoClient(CONNECTION_STRING)

    # Get a list of all databases
    dbs = ['granby','marciano','warren','west','fenway']
    # Drop each database
    for db in dbs:
        client.drop_database(db)
        print(f'Dropped database: {db}')
    client.close()

if __name__ == "__main__":
    # Get the database
    drop_all_databases()
    get_databases_granby()
    get_databases_marciano()
    get_databases_warren()
    get_databases_west()
    get_databases_fenway()