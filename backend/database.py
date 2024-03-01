from sqlalchemy import create_engine
from sqlalchemy import sessionmaker

from backend.config import get_settings

engine = create_engine(get_settings().SQL_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)