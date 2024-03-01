import os
from fastapi import FastAPI

app = FastAPI()

@app.get("/api/python")
def hello_world():
    return "I Love Python"