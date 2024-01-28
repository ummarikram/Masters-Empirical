from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import time
import csv

def convert_time_to_seconds(time_string: str):
    
    parts = time_string.split()
    total_seconds = 0

    for part in parts:
        if 'h' in part:
            total_seconds += int(part[:-1]) * 3600
        elif 'm' in part:
            total_seconds += int(part[:-1]) * 60
        elif 's' in part:
            total_seconds += int(part[:-1])

    return total_seconds

chrome_options = Options()

driver = webdriver.Chrome(options=chrome_options)

driver.maximize_window()

driver.get(f"https://www.blockchain.com/explorer/blocks/eth")
time.sleep(5)
    
dataset = []

while len(dataset) == 0:

    rows = driver.find_elements(By.XPATH, "//a[contains(@href, '/explorer/blocks/eth/') and contains(@style, 'display:contents;pointer-events:inherit;cursor:unset;color:inherit')]")
    time.sleep(5)
 
    for index in range(50, len(rows)):

        data = rows[index].text.split('\n')

        dataset.append({
            "BlockNumber": data[0],
            "Mined": convert_time_to_seconds(data[3]),
            "TxCount": data[4],
            "GasUsed": data[6].replace(',',''),
            "BlockSize": data[7].split('Bytes')[0].strip().replace(',', ''),
            "BlockReward": data[8].split('ETH')[0].strip(),
            "TotalFees": data[9].split('ETH')[0].strip()
        })
    
    nextBtn = driver.find_element(By.XPATH, "//div[text()='->']")
    time.sleep(2)

    nextBtn.location_once_scrolled_into_view
    time.sleep(1)

    nextBtn.click()
    time.sleep(5)

csv_file_path = '/dataset/eth.csv'

# Specify the field names
fields = ["BlockNumber", "Mined", "TxCount", "GasUsed", "BlockSize", "BlockReward", "TotalFees"]

# Writing to csv file
with open(csv_file_path, mode='w', newline='') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=fields)

    # Write the header
    writer.writeheader()

    # Write the data
    for data in dataset:
        writer.writerow(data)

print(f'CSV file "{csv_file_path}" created successfully.')   