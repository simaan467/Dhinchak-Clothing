import razorpay
from fastapi import APIRouter

router = APIRouter()

client = razorpay.Client(
    auth=("rzp_test_YOUR_KEY_ID", "YOUR_SECRET_KEY")
)

@router.post("/create-order")
def create_order(amount: int):
    order = client.order.create({
        "amount": amount * 100,
        "currency": "INR",
        "payment_capture": 1
    })
    return order
