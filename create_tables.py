from database.database import engine, SessionLocal, Base
from database.user import User
from database.models import Manga 
from passlib.hash import bcrypt

# Tạo lại tất cả bảng đã định nghĩa trong models
Base.metadata.create_all(bind=engine)

# (Tùy chọn) Thêm user mẫu
db = SessionLocal()
if not db.query(User).filter_by(username="bo").first():
    hashed_password = bcrypt.hash("123456")
    user = User(username="bo", password=hashed_password)
    db.add(user)
    db.commit()
db.close()