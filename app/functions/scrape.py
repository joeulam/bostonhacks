import requests
from bs4 import BeautifulSoup

def get_items(location, day, time):
    # The ______ dining hall website
    url = 'https://www.bu.edu/dining/location/' + location + '/#menu'
    page = requests.get(url)

    # Parse the HTML content
    soup = BeautifulSoup(page.content, 'html.parser')

    # Find the meals associated with the day and time period (breakfast, lunch, or dinner)
    food = soup.find('li', id='' + day + '-' + time)
    if food is not None:

        food_title = food.find_all('h3', class_='nutrition-title')
        food_info = {}
        for item in food_title:
            # Separates food section into lists: one for nutrient labels, and the other for amounts of each nutrient
            nutrient_list = item.parent.find_next('div', class_='nutrition-facts-half').find_all('td', class_='nutrition-label-nutrient')
            amount_list = item.parent.find_next('div', class_='nutrition-facts-half').find_all('td', class_='nutrition-label-amount')

            if (len(nutrient_list) == 14):
                label = item.get_text()[:-16]
                food_info[label] = [[0] * 10 for _ in range(2)]

                index = 0
                for nutrient in nutrient_list:
                    nutrient_text = nutrient.get_text()
                    if (index < 10):
                        food_info[label][0][index] = nutrient_text
                        index += 1
                    
                index = 0
                for amount in amount_list:
                    amount_text = amount.get_text()
                    if (index < 10):
                        food_info[label][0][index] = amount
                        index += 1

                return food_info

            
    else:
        print("No food items found on " + day + "'s" + time + "schedule at " + location + ".")
                




