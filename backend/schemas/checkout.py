from pydantic import BaseModel
from typing import List

class CheckoutBase(BaseModel):
    o_id : int
    p_id : int
    total_price : float

class CheckoutOut(CheckoutBase):
    grand_total : float
    items: List[CheckoutBase]
    class Config:
        from_attributes=True