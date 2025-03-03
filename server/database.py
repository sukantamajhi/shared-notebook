from motor.motor_asyncio import AsyncIOMotorClient

from config import MONGO_URI, APP_NAME

client = AsyncIOMotorClient(MONGO_URI)
db = client[APP_NAME]
users_collection = db["users"]
notes_collection = db["notes"]
