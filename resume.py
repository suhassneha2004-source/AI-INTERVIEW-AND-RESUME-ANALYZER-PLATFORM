import fitz
from groq import Groq
import os
from dotenv import load_dotenv

# LOAD ENV VARIABLES
load_dotenv()

# INITIALIZE GROQ CLIENT
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

# ==========================================
# PDF TEXT EXTRACTION
# ==========================================
def extract_resume_text(pdf_file):

    text = ""

    pdf_bytes = pdf_file.file.read()

    doc = fitz.open(
        stream=pdf_bytes,
        filetype="pdf"
    )

    for page in doc:

        text += page.get_text()

    return text


# ==========================================
# COMMON AI FUNCTION
# ==========================================
def ask_ai(prompt):

    response = client.chat.completions.create(

        model="llama-3.1-8b-instant",

        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],

        temperature=0.3,

        response_format={
            "type": "json_object"
        }
    )

    return response.choices[0].message.content


# ==========================================
# MAIN ANALYSIS FUNCTION
# ==========================================
def analyze_resume(resume_text):

    # ==========================================
    # OVERVIEW PROMPT
    # ==========================================
    overview_prompt = f"""
Analyze this resume.

Return ONLY JSON.

Structure:

{{
  "ats_score": 0,
  "skills": [],
  "strengths": [],
  "weaknesses": []
}}

Resume:
{resume_text}
"""

    # ==========================================
    # TECHNICAL QUESTIONS
    # ==========================================
    technical_prompt = f"""
Generate 50 technical interview questions WITH answers.

Return ONLY JSON.

Structure:

{{
  "technical_questions": [
    {{
      "question": "",
      "answer": "",
      "difficulty": ""
    }}
  ]
}}

Rules:
- Questions based on resume
- Include projects
- Include programming
- Include embedded systems
- Include Python
- Include IOT
- Include DBMS
- Include problem solving

Difficulty:
- Beginner
- Intermediate
- Advanced

Resume:
{resume_text}
"""

    # ==========================================
    # HR QUESTIONS
    # ==========================================
    hr_prompt = f"""
Generate 50 HR interview questions WITH answers.

Return ONLY JSON.

Structure:

{{
  "hr_questions": [
    {{
      "question": "",
      "answer": "",
      "difficulty": ""
    }}
  ]
}}

Resume:
{resume_text}
"""

    # ==========================================
    # APTITUDE QUESTIONS
    # ==========================================
    aptitude_prompt = f"""
Generate 50 aptitude questions WITH answers.

Return ONLY JSON.

Structure:

{{
  "aptitude_questions": [
    {{
      "question": "",
      "answer": "",
      "difficulty": ""
    }}
  ]
}}

Include:
- quantitative aptitude
- logical reasoning
- analytical thinking
- coding logic
- puzzles

Difficulty:
- Beginner
- Intermediate
- Advanced
"""

    # ==========================================
    # AI CALLS
    # ==========================================
    overview = ask_ai(overview_prompt)

    technical = ask_ai(technical_prompt)

    hr = ask_ai(hr_prompt)

    aptitude = ask_ai(aptitude_prompt)

    # ==========================================
    # COMBINE JSON
    # ==========================================
    import json

    overview_data = json.loads(overview)

    technical_data = json.loads(technical)

    hr_data = json.loads(hr)

    aptitude_data = json.loads(aptitude)

    final_data = {

        **overview_data,

        **technical_data,

        **hr_data,

        **aptitude_data
    }

    return json.dumps(final_data)