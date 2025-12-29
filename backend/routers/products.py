from fastapi import HTTPException,Depends
from backend import models
from backend.schemas.products import ProductCreate,ProductOut
from fastapi import APIRouter
from sqlalchemy.orm import Session
from typing import Annotated
from backend.database import get_db

router = APIRouter(prefix="/products",tags = ["products"])
db_dependency = Annotated[Session, Depends(get_db)]


@router.get("/all", response_model= list[ProductOut])
def get_all_products(db: db_dependency):
    return db.query(models.Product).all()


@router.get('/product/{p_id}',response_model=ProductOut)
def get_product(p_id:int,db:db_dependency):
    user = db.query(models.Product).filter(models.Product.p_id == p_id).first()
    if not user:
        raise HTTPException(status_code= 404,detail = "User not found")
    return user


@router.post('/',response_model=ProductOut)
def create_product(product:ProductCreate,db:db_dependency):
    db_user = models.Product(**product.model_dump())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user