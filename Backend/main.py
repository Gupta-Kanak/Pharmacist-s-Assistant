from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import easyocr
import numpy as np
import cv2
from io import BytesIO
import requests
import os
from dotenv import load_dotenv
import os

# Load api-key from env file
load_dotenv()  
API_KEY = os.getenv("API_KEY")

# Load the model
reader = easyocr.Reader(['en'])  # Initialize OCR reader

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods 
    allow_headers=["*"],  # Allow all headers
)


@app.post("/process-prescription/")
async def process_prescription(file: UploadFile = File(...)):
    # Read the input
    contents = await file.read()
    np_image = np.frombuffer(contents, np.uint8)

    # Pre-process the input
    image = cv2.imdecode(np_image, cv2.IMREAD_GRAYSCALE) # Convert to grayscale
    image = cv2.resize(image, (1024, 1024))  # Resize to a standard size
    image = cv2.GaussianBlur(image, (5,5), 0)  # Reduce noise

    # Extract the text
    result = reader.readtext(image)
    extracted_text = " ".join([text[1] for text in result])

    # Call Mistral AI
    prompt = extracted_text + " From the given string, extract the names of medicines. as output just give the names of medicines that you are sure of.Answer in json format."
    url = "https://api.mistral.ai/v1/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }
    data = {
        "model": "mistral-medium",
        "messages": [{"role": "user", "content": prompt}],
        "response_format": {"type": "json_object"}
    }

    response = requests.post(url, json=data, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
        res = data["choices"][0]["message"]["content"] # Extracting the relevant response
        return {res}  
    else:
        return {"error": f"Mistral API failed: {response.status_code}, {response.text}"}


    

