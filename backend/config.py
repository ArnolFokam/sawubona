import os
from functools import lru_cache
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    SQL_DATABASE_URL:  str = os.getenv("SQL_DATABASE_URL", "sqlite:///./test.db")


@lru_cache
def get_settings():
    return Settings()