from typing import Optional

from bson import ObjectId
from pydantic import BaseModel, EmailStr, validator


class User(BaseModel):
    email: EmailStr
    username: str
    hashed_password: str


class UserInDB(User):
    id: Optional[str]


class Note(BaseModel):
    title: str
    description: Optional[str]
    content: Optional[str]


class NoteInDB(Note):
    id: str
    created_by: str
