from fastapi import APIRouter, HTTPException

from core.security import hash_password, verify_password, create_access_token
from database import users_collection
from schemas import UserCreate, TokenResponse

router = APIRouter()


@router.post("/register", response_model=TokenResponse)
async def register(user: UserCreate):
    existing_user = await users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail={
                "error": True,
                "code": "USER_ALREADY_EXISTS",
                "message": "User already exists",
            },
        )

    hashed_pw = hash_password(user.password)
    new_user = await users_collection.insert_one(
        {
            "email": user.email,
            "username": user.username,
            "password": hashed_pw,
        }
    )

    access_token = create_access_token(
        {"sub": user.email, "user_id": str(new_user.inserted_id)}
    )
    return {
        "error": False,
        "code": "USER_CREATED_SUCCESS",
        "message": "User created successfully",
        "access_token": access_token,
        "token_type": "Bearer",
    }


@router.post("/login", response_model=TokenResponse)
async def login(user: UserCreate):
    db_user = await users_collection.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    print(db_user, "<<-- db user")
    access_token = create_access_token(
        {"user_id": str(db_user["_id"]), "sub": db_user["email"]}
    )
    return {
        "error": False,
        "code": "LOGIN_SUCCESS",
        "message": "User logged in successfully",
        "access_token": access_token,
        "token_type": "Bearer",
    }
