import os

from dotenv import load_dotenv

load_dotenv()

print(os.getenv("APP_NAME"))

APP_NAME = os.getenv("APP_NAME")
MONGO_URI = os.getenv("MONGO_URI")
JWT_SECRET = os.getenv("JWT_SECRET")
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60))