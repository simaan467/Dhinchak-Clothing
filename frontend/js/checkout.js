document.getElementById("payBtn").addEventListener("click", async () => {

    const totalRes = await fetch("http://127.0.0.1:8000/cart/total");
    const totalData = await totalRes.json();

    const amount = totalData.grand_total;

    const orderRes = await fetch("http://127.0.0.1:8000/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount })
    });

    const order = await orderRes.json();

    // 3️⃣ Razorpay options
    const options = {
        key: "rzp_test_YOUR_KEY_ID",
        amount: order.amount,
        currency: "INR",
        name: "Your Store Name",
        description: "Order Payment",
        order_id: order.id,

        handler: function (response) {
            // Payment success
            console.log(response);

            // Optional: verify payment backend-side

            window.location.href = "thankyou.html";
        },

        prefill: {
            name: "Test User",
            email: "test@example.com",
            contact: "9999999999"
        },

        theme: {
            color: "#ee4266"
        }
    };

    const rzp = new Razorpay(options);
    rzp.open();
});
