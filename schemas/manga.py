from pydantic import BaseModel, ConfigDict
from typing import List

class MangaBase(BaseModel):
    title: str
    author: str
    category: str
    image: str
    description: str

class MangaCreate(MangaBase):
    pass  # dùng cho input, không cần `id`

class Manga(MangaBase):
    id: int
    model_config = ConfigDict(from_attributes=True)
