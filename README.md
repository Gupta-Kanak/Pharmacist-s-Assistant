# Pharmacist's Assistant

This project is a module that can be integrated in AI e-commerce website. This module extracts medicine names from the handwritten prescription using OCR and returns the names of medicines.

## Features 🚀

<ul>
<li><b>Handwritten Prescription Recognition :</b>  Uses EasyOCR to extract text from handwritten prescriptions.</li>
<li><b>Medicine Name Extraction :</b> Mistral AI API processes extracted text to identify medicine names accurately.</li>
<li><b>User-Friendly Interface :</b> A simple and clean interface for easy image uploading and viewing output.</li>
</ul>

## Tech Stack

<ul>
  <li><b>OCR Engine :</b> EasyOCR</li>
  <li><b>NLP Model :</b> Mistral AI API for medicine name extraction</li>
  <li><b>Backend :</b> Python (FastAPI)</li>
  <li><b>Frontend :</b> React.js</li>
</ul>

## Installation & Setup

Follow these steps to run the project locally:
1. Clone the Repository
   
```
$ git clone https://github.com/Gupta-Kanak/Pharmacist-s-Assistant.git
$ cd Pharmacist-s-Assistant
```
2. Install Dependencies

```
$ npm install
```
3. Get Mistral AI API key from https://console.mistral.ai/home

4. Store the API key in a .env file as

```
$ API_KEY = "YOUR-API-KEY"
```
place the .env file in the same place as package.json file

5. Run the Application
   Step - 1
   Run the backend server
```
$ cd Backend
$ uvicorn main:app --reload
```

  Step - 2
  Run the front-end application in a different terminal.
```
$ npm start
```
4. Open http://localhost:3000 or http://localhost:3001 in your browser to view the app.

5. The image can be uploaded either from the user's system, drag and drop option. OR
   There are some sample images available in this repository at [**src folder -> Images**](./src/Images)
## 

