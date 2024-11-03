import json
from pymongo import MongoClient

def get_database():
    # Provide the MongoDB Atlas URL to connect Python to MongoDB using pymongo
    CONNECTION_STRING = "mongodb+srv://joeulam:0707@cluster0.sgvrk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    
    # Create a connection using MongoClient
    client = MongoClient(CONNECTION_STRING)
    
    # Create the database for our example
    return client['marci']

def insert_json_data(db):
    """
    Reads data from a JSON file and inserts it into a MongoDB collection.
    """
    with open('food_items_marci.json') as file:
        data = json.load(file)  # Load the JSON data
    
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