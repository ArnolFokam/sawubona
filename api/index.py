import os
from typing import Annotated
from fastapi import Depends, FastAPI

from api.config import Settings, get_settings

app = FastAPI()

@app.get("/api/python")
def hello_world():
    return "I Love Python"