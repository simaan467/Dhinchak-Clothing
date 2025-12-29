from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base


URL_DATABASE = f"postgresql://ecommerce:sim12345@localhost:5432/ecommerce"
engine = create_engine(URL_DATABASE)
sessionlocal = sessionmaker(autocommit = False,autoflush = False,bind = engine)
Base = declarative_base()

def get_db():
    db = sessionlocal()
    try:
        yield db
    finally:
        db.close()