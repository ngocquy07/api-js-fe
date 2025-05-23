from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
from database.database import SessionLocal
from database.models import Manga as MangaModel
import shutil
import os

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

UPLOAD_DIR = "uploaded_images"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/manga")
def add_manga(
    title: str = Form(...),
    author: str = Form(...),
    category: str = Form(...),
    description: str = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    image_path = os.path.join(UPLOAD_DIR, image.filename)
    with open(image_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
    db_manga = MangaModel(
        title=title,
        author=author,
        category=category,
        description=description,
        image=image_path
    )
    db.add(db_manga)
    db.commit()
    db.refresh(db_manga)
    return {"message": "Added"}