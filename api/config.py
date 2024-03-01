from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    SQL_DATABASE_URL: str
    
    model_config = SettingsConfigDict(env_file=".env.development")


@lru_cache
def get_settings():
    return Settings()