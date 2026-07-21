# pip install selenium
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from time import sleep
import shutil
import os

# todo: check internet conditions before attempting to download
# initialize the web driver
print("Beginning download for Team Drive...")
print("Initializing Firefox Web Driver...")
driver = webdriver.Firefox()

# Open the tutorials point website using get() method
print("Opening Google Drive...")
driver.get("https://drive.google.com/drive/folders/1Hmt9w5LzJ8E9gVRWu2hzoqX0Mgq08pZm")

# clicking the courses tab in homepage.
# driver.find_element(By.XPATH,"(//div[.= 'Fazer download de tudo'])[3]").click()
# todo: replace the message 'Fazer download de tudo' according to the language

print("Downloading all files...")
### Portuguese
# WebDriverWait(driver, 1000000).until(EC.element_to_be_clickable((By.XPATH, "(//div[.= 'Fazer download de tudo'])[3]"))).click()

### German
#WebDriverWait(driver, 1000000).until(EC.element_to_be_clickable((By.XPATH, "(//div[.= 'Alle herunterladen'])[3]"))).click()

### English
WebDriverWait(driver, 1000000).until(EC.element_to_be_clickable((By.XPATH, "(//div[.= 'Download all'])[3]"))).click()

# todo: wait until download is finished. Use awaitUntil an object related to the download is displayed.
# with this approach we would not need to wait 20 seconds

# Wait 30 seconds before closing the browser
print("Waiting 30 seconds before closing the browser...")
sleep(30)
print("Closing the browser...")
driver.close()
driver.quit()

# Move the downloaded files to the desired folder
downloads_folder = "C:/Users/Bachi/Downloads/"
backup_folder = "C:/Users/Bachi/Downloads/Geomundus_Backups/"

print("Moving downloaded files to the backup folder...")
for file in os.listdir(downloads_folder):
    if file.endswith("Z-001.zip"):  # Assuming the downloaded files are ZIP files, adjust as needed
        shutil.move(os.path.join(downloads_folder, file), os.path.join(backup_folder, file))

print("Download finished!")





'''
# todo: check internet conditions before attempting to download
# initialize the web driver
print("Beginning process for Web Team Secure Files...")
print("Initializing Firefox Web Driver...")
driver = webdriver.Firefox()

# Open the tutorials point website using get() method
print("Opening Google Drive...")
driver.get("https://drive.google.com/drive/folders/14si8RQc7_oQo89el__iZKj9QylNe4fZS")

# clicking the courses tab in homepage.
# driver.find_element(By.XPATH,"(//div[.= 'Fazer download de tudo'])[3]").click()
# todo: replace the message 'Fazer download de tudo' according to the language

print("Downloading all files...")
### Portuguese
# WebDriverWait(driver, 1000000).until(EC.element_to_be_clickable((By.XPATH, "(//div[.= 'Fazer download de tudo'])[3]"))).click()

### German
#WebDriverWait(driver, 1000000).until(EC.element_to_be_clickable((By.XPATH, "(//div[.= 'Alle herunterladen'])[3]"))).click()

### English
WebDriverWait(driver, 1000000).until(EC.element_to_be_clickable((By.XPATH, "(//div[.= 'Download all'])[3]"))).click()

# todo: wait until download is finished. Use awaitUntil an object related to the download is displayed.
# with this approach we would not need to wait 20 seconds

# Wait 30 seconds before closing the browser
print("Waiting 30 seconds before closing the browser...")
sleep(30)
print("Closing the browser...")
driver.close()
driver.quit()

# Move the downloaded files to the desired folder
downloads_folder = "C:/Users/Bachi/Downloads/"
backup_folder = "C:/Users/Bachi/Downloads/Geomundus_Backups/"

print("Moving downloaded files to the backup folder...")
for file in os.listdir(downloads_folder):
    if file.endswith("Z-001.zip"):  # Assuming the downloaded files are ZIP files, adjust as needed
        shutil.move(os.path.join(downloads_folder, file), os.path.join(backup_folder, file))

print("Download finished!")

print("Process finished!")
'''