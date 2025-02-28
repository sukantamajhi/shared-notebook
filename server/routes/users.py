from fastapi import APIRouter, Depends

from core.security import get_current_user
from schemas import UserResponse

router = APIRouter()


@router.get("/me", response_model=UserResponse)
async def read_users_me(current_user: dict = Depends(get_current_user)):
    return {"email": current_user["sub"], "user_id": current_user["user_id"]}
