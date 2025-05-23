from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.database import SessionLocal
from database.models import Manga as MangaModel

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.delete("/manga/{manga_id}")
def delete_manga(manga_id: int, db: Session = Depends(get_db)):
    manga = db.query(MangaModel).filter(MangaModel.id == manga_id).first()
    if not manga:
        raise HTTPException(status_code=404, detail="Manga not found")
    db.delete(manga)
    db.commit()
    return {"message": "Delete"}

