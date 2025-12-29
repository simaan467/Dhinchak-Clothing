from pydantic import BaseModel

class OrderBase(BaseModel):
    o_id : int
    total_price : int
    p_image : str

class OrderOut(OrderBase):
    total_price : float
    class Config:
        from_attributes=True
