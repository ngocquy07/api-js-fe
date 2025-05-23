from sqlalchemy import Column, Integer, String
from sqlalchemy.dialects.postgresql import ARRAY
from .database import Base

class Manga(Base):
    __tablename__ = "mangas"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    author = Column(String, nullable=False)
    category = Column(String, nullable=False)      # Thể loại
    image = Column(String, nullable=False)
    description = Column(String, nullable=False)