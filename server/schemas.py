from typing import Generic, TypeVar

from pydantic import BaseModel, EmailStr

T = TypeVar("T")


class ResponseEntity(BaseModel):
    error: bool
    code: str
    message: str


class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str


class UserResponse(BaseModel):
    email: EmailStr
    username: str


class TokenResponse(ResponseEntity):
    access_token: str
    token_type: str


class DataResponse(ResponseEntity, Generic[T]):
    data: T
