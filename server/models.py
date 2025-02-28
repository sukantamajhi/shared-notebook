from pydantic import BaseModel, EmailStr
from typing import Optional

class User(BaseModel):
    email: EmailStr
    username: str
    hashed_password: str

class UserInDB(User):
    id: Optional[str]
