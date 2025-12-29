from pydantic import BaseModel

class ProductBase(BaseModel):
    p_name : str
    p_desc : str
    p_price : int
    p_image : str

#schema for post request -> creatiing product
class ProductCreate(ProductBase):
    pass

# schema for api response
class ProductOut(ProductBase):
    p_id: int

    class Config:
        from_attributes=True