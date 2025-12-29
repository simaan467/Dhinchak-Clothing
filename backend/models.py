from sqlalchemy import String,Integer,Column,ForeignKey
from backend.database import Base
from sqlalchemy.orm import relationship

class Product(Base):
    __tablename__ = 'products'
    __table_args__ = {'schema': 'ecommerce'}
    p_id = Column(Integer,primary_key = True, index = True)
    p_name = Column(String(50),unique = True)
    p_desc = Column(String(200),nullable = True)
    p_price = Column(Integer)
    p_image = Column(String(50))

class Cart(Base):
    __tablename__ = 'carts'
    __table_args__ = {'schema': 'ecommerce'}
    c_id = Column(Integer,primary_key = True, index = True)
    user_id = Column(Integer, default = 0)
    p_id = Column(Integer,ForeignKey("ecommerce.products.p_id"))
    p_quantity = Column(Integer,default = 1)
    p_size = Column(String(10), default = 'medium')
    product = relationship("Product")
    
class Checkout(Base):
    __tablename__ = 'checkouts'
    __table_args__ = {'schema': 'ecommerce'}
    p_id = Column(Integer,primary_key = True,index = True)
    total_price = Column(Integer)
    p_quantity = Column(Integer,default = 1)
    p_image = Column(String(50))

class Order(Base):
    __tablename__ = 'orders'
    __table_args__ = {'schema': 'ecommerce'}
    o_id = Column(Integer,primary_key = True)
    p_name = Column(String(50))
    total_price = Column(Integer)
    p_image = Column(String(50))
    size = Column(String(10), nullable=False)