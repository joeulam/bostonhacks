import requests
from bs4 import BeautifulSoup
from datetime import date
import json
import json
from pymongo import MongoClient
from scrape import get_items

def get_databases():
    # Provide the MongoDB Atlas URL to connect Python to MongoDB using pymongo
    CONNECTION_STRING = "mongodb+srv://joeulam:0707@cluster0.sgvrk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    
    # Create a connection using MongoClient
    client = MongoClient(CONNECTION_STRING)
    
    return client['joemama']

def insert_json_data(db, location):
    """
    Reads data from a JSON file and inserts it into a MongoDB collection.
    """
    data = get_items(location)
    print(data)

    if data:
    
        # Specify the collection to insert the data into
        collection = db['dinner']

        # Insert the data into the collection
        if isinstance(data, list):
            collection.insert_many(data)  # Use insert_many if data is a list
        else:
            collection.insert_one(data)    # Use insert_one if data is a single document

        print("Data inserted successfully.")
    else:
        print("No data to print for location")

def main():
    db = get_databases()
    for location in ['fenway', 'west', 'warren', 'marciano', 'granby']:
        insert_json_data(db, location)


if __name__ == "__main__":
    main()
