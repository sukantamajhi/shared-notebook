from fastapi import FastAPI
from routes.auth import router as AuthRouter
from routes.users import router as UserRouter

app = FastAPI(title="FastAPI Authentication with MongoDB")

app.include_router(AuthRouter, prefix="/auth", tags=["Authentication"])
app.include_router(UserRouter, prefix="/users", tags=["Users"])

@app.get("/")
def root():
    return {"message": "Welcome to FastAPI Auth with MongoDB"}
