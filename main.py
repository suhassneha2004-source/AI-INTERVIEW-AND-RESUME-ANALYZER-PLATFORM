import json

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from app.resume import (
    extract_resume_text,
    analyze_resume
)

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Home Route
@app.get("/")
def home():

    return {
        "message": "Backend Running Successfully"
    }

# Upload Resume Route
@app.post("/upload-resume")
async def upload_resume(
    file: UploadFile = File(...)
):

    try:

        # Extract text from PDF
        resume_text = extract_resume_text(file)

        print("========== RESUME TEXT ==========")
        print(resume_text)

        # Send to AI
        print("========== SENDING TO AI ==========")

        ai_response = analyze_resume(resume_text)

        print("========== RAW AI RESPONSE ==========")
        print(ai_response)

        # Convert JSON string into Python dictionary
        analysis_data = json.loads(ai_response)

        print("========== PARSED JSON ==========")
        print(analysis_data)

        # Return clean JSON
        return {
            "success": True,
            "analysis": analysis_data
        }

    except Exception as error:

        print("========== ERROR ==========")
        print(error)

        return {
            "success": False,
            "message": str(error)
        }