from fastapi import APIRouter,HTTPException,Depends,status
from backend.models import Cart,Product
from backend import models
from backend.schemas.cart import CartBase,CartOut,CartperOut,Cartdelete,CartAdd
from sqlalchemy.orm import Session
from typing import Annotated
from backend.database import get_db

db_dependency = Annotated[Session, Depends(get_db)]

router = APIRouter(prefix="/cart", tags=["Cart"])

@router.post('/add/{p_id}', response_model=CartBase)
def add_to_cart(p_id: int, data: CartAdd, db: db_dependency):
    product = db.query(Product).filter(Product.p_id == p_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    cart_item = db.query(Cart).filter(
        Cart.p_id == p_id,
        Cart.p_size == data.p_size
    ).first()

    if cart_item:
        cart_item.p_quantity += data.p_quantity
    else:
        cart_item = Cart(
            p_id=p_id,
            p_size=data.p_size,
            p_quantity=data.p_quantity
        )
        db.add(cart_item)

    db.commit()
    db.refresh(cart_item)

    return {
        "c_id": cart_item.c_id,
        "p_id": product.p_id,
        "p_name": product.p_name,
        "p_image": product.p_image,
        "p_price": product.p_price,
        "p_size": cart_item.p_size,
        "p_quantity": cart_item.p_quantity,
        "total_price": product.p_price * cart_item.p_quantity
    }


@router.get("/total", response_model=CartOut)
def get_total_amount(db: db_dependency):
    cart_items = db.query(models.Cart).all()

    items_with_totals = []
    grand_total = 0

    for item in cart_items:
        subtotal = item.product.p_price * item.p_quantity
        grand_total += subtotal

        items_with_totals.append({
            "c_id": item.c_id,
            "p_id": item.p_id,
            "p_image": item.product.p_image,
            "p_name": item.product.p_name,
            "p_price": item.product.p_price,
            "p_size" : item.p_size,
            "p_quantity": item.p_quantity,
            "total_price": subtotal
        })

    return {
        "items": items_with_totals,
        "grand_total": grand_total
    }

@router.get("/perproducttotal", response_model=CartperOut)
def get_per_total(db: db_dependency):
    cart_items = db.query(models.Cart).all()
    items_total = []
    for item in cart_items:
        subtotal = item.product.p_price * item.p_quantity
        items_total.append({
            "c_id": item.c_id,
            "p_id": item.p_id,
            "p_image": item.product.p_image,
            "p_name": item.product.p_name,
            "p_price": item.product.p_price,
            "p_size" : item.p_size,
            "p_quantity": item.p_quantity,
            "total_price": subtotal
        })
    return {"items": items_total}

@router.delete('/{c_id}',response_model=Cartdelete)
def remove_item(c_id:int,db:db_dependency):
    item = db.query(models.Cart).filter(models.Cart.c_id == c_id).first()
    if not item:
        raise HTTPException(status_code=404,detail="Cart item not found")
    db.delete(item)
    db.commit()
    return {"message" : "item deleted sucessfully"}
