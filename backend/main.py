from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os

from backend.routers import products, cart, orders, checkout
from backend import models
from backend.database import engine

app = FastAPI()
# Absolute path to backend/static
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # backend/
STATIC_DIR = os.path.join(BASE_DIR, "static")          # backend/static

# Check the path
print("Static directory:", STATIC_DIR)
if not os.path.exists(STATIC_DIR):
    raise RuntimeError(f"Static folder not found at {STATIC_DIR}")

# Mount static folder
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")
# Include routers
app.include_router(products.router)
app.include_router(cart.router)
app.include_router(checkout.router)
app.include_router(orders.router)

# Create tables
models.Base.metadata.create_all(bind=engine)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "received"}
