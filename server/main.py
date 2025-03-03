from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from routes.router import router

app = FastAPI(title="FastAPI Authentication with MongoDB")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://sharednotebook.vercel.app",
        "http://localhost:3000",
        "http://localhost:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(router, prefix="/api")


@app.get("/", include_in_schema=False)
def root():
    return {"message": "Welcome to FastAPI Auth with MongoDB"}
