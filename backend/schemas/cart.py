from pydantic import BaseModel

from typing import List
class CartBase(BaseModel):
    c_id : int
    p_id : int
    p_image : str
    p_name : str
    p_price : int
    p_size : str
    p_quantity : int = 1
    total_price : float

    class Config:
        from_attributes = True

#to add size and qauntity in product.html and save to backend
class CartAdd(BaseModel):
    p_size: str
    p_quantity: int
    class Config:
        from_attributes = True

class CartOut(BaseModel):
    items: List[CartBase]
    grand_total: float

    class Config:
        from_attributes = True

class CartperOut(BaseModel):
    items: List[CartBase]
    class Config:
        from_attributes = True

class Cartdelete(BaseModel):
    message : str
