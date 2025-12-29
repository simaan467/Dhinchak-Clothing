from fastapi import APIRouter,HTTPException,Depends,status
from backend.models import Cart
from backend import models
from backend.schemas.checkout import CheckoutBase,CheckoutOut
from sqlalchemy.orm import Session
from typing import Annotated
from backend.database import get_db
from backend.schemas.cart import CartOut

db_dependency = Annotated[Session, Depends(get_db)]
router = APIRouter(prefix="/checkout", tags=["Checkout"])


@router.get("/",response_model=CartOut)
def get_cart(o_id:int,db:db_dependency):
    cart_items = db.query(models.Cart).filter(Cart.o_id == o_id).all()
    total_price = sum(item.quantity * item.p_price for item in cart_items)
    return {
        "items" : cart_items,
        "total_price" : total_price
    }

@router.post('/checkouts/',response_model=CheckoutOut)
def create_checkout(db:db_dependency):
    cart_items = db.query(models.Cart).all()
    if not cart_items:
        raise HTTPException(status_code=400,detail="nothing in cart!")
    total = 0
    order_items = []

    for item in cart_items:
        product = item.product
        try:
            if product.stock < item.quantity:
                raise HTTPException(status_code=400, detail = "it is out of stock")
        except:
            total += item.p_quantity * product.p_price
            order_items.append(models.Order(p_quantity = item.quantity))
    
    order = models.Order(total_price = total)
    db.add(order)
    db.commit()
    db.refresh(order)
    for oi in order_items:
        oi.order_id = order.id
        db.add(oi)

    db.query(models.Cart).delete()
    db.commit()

    return order


