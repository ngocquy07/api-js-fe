from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import get, post, delete, auth
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(get.router)
app.include_router(post.router)
app.include_router(delete.router)
app.include_router(auth.router)
app.mount("/uploaded_images", StaticFiles(directory="uploaded_images"), name="uploaded_images")