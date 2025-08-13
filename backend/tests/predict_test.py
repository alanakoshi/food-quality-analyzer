import requests
import os

# local testing
url = "http://127.0.0.1:8000/predict"
# api testing
# url = "https://alanakoshi-food-quality-analyzer.hf.space/predict" 

test_folder = "test_images"

for filename in os.listdir(test_folder):
    file_path = os.path.join(test_folder, filename)

    with open(file_path, "rb") as f:
        files = {"file": (filename, f, "multipart/form-data")}
        response = requests.post(url, files=files)

    print(f"Testing {filename} Response: {response.json()}")