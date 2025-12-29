from fastapi import APIRouter,HTTPException,Depends,status
from backend.schemas.orders import OrderBase
from backend.models import Order
from backend import models
from sqlalchemy.orm import Session
from typing import Annotated
from backend.database import get_db

db_dependency = Annotated[Session, Depends(get_db)]
router = APIRouter(prefix="/order", tags=["Order"])

@router.post('/orders/',status_code=status.HTTP_201_CREATED)
def create_order(order:OrderBase,db:db_dependency):
    db_user = models.Order(**order.model_dump())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

