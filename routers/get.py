from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.database import SessionLocal
from database.models import Manga as MangaModel
from schemas.manga import Manga as MangaSchema
from typing import List

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/manga", response_model=List[MangaSchema])
def get_manga(db: Session = Depends(get_db)):
    return db.query(MangaModel).all()

@router.get("/manga/{manga_id}", response_model=MangaSchema)
def get_manga_detail(manga_id: int, db: Session = Depends(get_db)):
    manga = db.query(MangaModel).filter(MangaModel.id == manga_id).first()
    if manga is None:
        raise HTTPException(status_code=404, detail="Not found")
    return manga


