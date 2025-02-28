from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.auth import router as AuthRouter
from routes.users import router as UserRouter

app = FastAPI(title="FastAPI Authentication with MongoDB")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://sharednotebook.vercel.app/", "http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(AuthRouter, prefix="/auth", tags=["Authentication"])
app.include_router(UserRouter, prefix="/users", tags=["Users"])


@app.get("/")
def root():
    return {"message": "Welcome to FastAPI Auth with MongoDB"}
