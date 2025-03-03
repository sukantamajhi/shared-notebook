from typing import Any, Coroutine
import jwt
from datetime import datetime, timedelta, timezone
from passlib.context import CryptContext
from fastapi.security import HTTPBearer
from fastapi import Depends, HTTPException
from config import JWT_SECRET, JWT_ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
from database import users_collection
from schemas import CurrentUser, UserResponse

# Password hashing setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# OAuth2 Bearer Token setup
oauth2_scheme = HTTPBearer()


# Hash password
def hash_password(password: str) -> str:
    return pwd_context.hash(password)


# Verify password
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


# Create JWT token
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)


# Decode JWT token
def decode_token(token: str):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


# Get the current authenticated user
async def get_current_user(
    token=Depends(oauth2_scheme),
) -> CurrentUser:
    token = token.credentials  # Extract only the token part
    payload = decode_token(token)

    if not payload:
        raise HTTPException(
            status_code=401, detail="Invalid authentication credentials"
        )

    user = await users_collection.find_one({"email": payload["sub"]})
    if not user:
        raise HTTPException(
            status_code=401, detail="Invalid authentication credentials"
        )

    # Return the user data as a UserResponse model
    return CurrentUser(
        id=str(user["_id"]),  # Convert ObjectId to string
        username=user["username"],
        email=user["email"],
    )
