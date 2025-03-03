from fastapi import APIRouter

from routes import auth, notes, users

router = APIRouter()

router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
router.include_router(users.router, prefix="/users", tags=["Users"])
router.include_router(notes.router, prefix="/notes", tags=["Notes"])
