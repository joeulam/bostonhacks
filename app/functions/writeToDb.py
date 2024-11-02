import requests
from bs4 import BeautifulSoup
from datetime import date
import json
import json
from pymongo import MongoClient

today = str(date.today())

def get_items(location, time):
    # The ______ dining hall website
    url = 'https://www.bu.edu/dining/location/' + location + '/#menu'
    page = requests.get(url)

    if page.status_code != 200:
        print(f"Failed to retrieve data from {url}. Status code: {page.status_code}")
        return False

    # Parse the HTML content
    soup = BeautifulSoup(page.content, 'html.parser')

    # Find the meals associated with the day and time period (breakfast, lunch, or dinner)
    food = soup.find('li', id=f'{today}-{time}')
    if food is not None:

        food_title = food.find_all('h3', class_='nutrition-title')
        food_info = []
        for item in food_title:
            # Separates food section into lists: one for nutrient labels, and the other for amounts of each nutrient
            nutrient_list = item.parent.find_next('div', class_='nutrition-facts-half').find_all('td', class_='nutrition-label-nutrient')
            amount_list = item.parent.find_next('div', class_='nutrition-facts-half').find_all('td', class_='nutrition-label-amount')

            if (len(nutrient_list) == 14):
                food_dict = {"id": item.get_text()[:-16]}

                for nutrient, amount in zip(nutrient_list, amount_list):
                    label = nutrient.get_text()
                    value = amount.get_text().replace("g", "").replace("m", "").strip()
                    food_dict[label] = int(value)
                
                food_info.append(food_dict)

        # Save to JSON file
        with open('food_items.json', 'w') as json_file:
            json.dump(food_info, json_file, indent=4)
            
    else:
        print("No food items found on " + today + "'s" + time + "schedule at " + location + ".")
                
def get_fenway(time):
    url = 'https://menus.sodexomyway.com/BiteMenu/Menu?menuId=34476&locationId=31992001&whereami=https://bufenway.sodexomyway.com/dining-near-me/campus-center-dining-room'
    page = requests.get(url)

    soup = BeautifulSoup(page.content, 'html.parser')

    if today[-2:][0] == '0':
        day = today[-1:]
    else:
        day = today[-2:]

    food = soup.find('div', id='menuid-' + day + '-day')
    if food is not None:

        food_title = food.find_all('a', class_='get-nutritioncalculator primary-textcolor')
        food_info = {}


# TODO
# Connect Python with MongoDB
# load it up to mongodb

def get_database():
    # Provide the MongoDB Atlas URL to connect Python to MongoDB using pymongo
    CONNECTION_STRING = "mongodb+srv://joeulam:0707@cluster0.sgvrk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    
    # Create a connection using MongoClient
    client = MongoClient(CONNECTION_STRING)
    
    # Create the database for our example
    return client[location]

def insert_json_data(db):
    """
    Reads data from a JSON file and inserts it into a MongoDB collection.
    """
    data = food_info
    
    # Specify the collection to insert the data into
    collection = db['dinner']

    # Insert the data into the collection
    if isinstance(data, list):
        collection.insert_many(data)  # Use insert_many if data is a list
    else:
        collection.insert_one(data)    # Use insert_one if data is a single document

    print("Data inserted successfully.")

if __name__ == "__main__":
    # Get the database
    dbname = get_database()
    
    # Insert JSON data into the database
    insert_json_data(dbname)
