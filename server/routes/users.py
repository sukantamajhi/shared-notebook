from fastapi import APIRouter, Depends

from core.security import get_current_user
from schemas import UserResponse

router = APIRouter()


@router.get("/me")
async def read_users_me(current_user: dict = Depends(get_current_user)):
    return current_user
