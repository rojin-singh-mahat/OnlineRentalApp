import React, { useEffect } from "react";
import "./App.css";

function PaymentSuccess() {
    const buyerName = localStorage.getItem('buyerName');
    const buyerEmail = localStorage.getItem('buyerEmail');
    const buyerPhone = localStorage.getItem('buyerPhone');
    const ownerEmail = localStorage.getItem('ownerEmail');
    const amount = localStorage.getItem('amount');

    console.log("Buyer Name:", buyerName);
    console.log("Buyer Email:", buyerEmail);
    console.log("Buyer Phone:", buyerPhone);
    console.log("Owner Email:", ownerEmail);


    useEffect(() => {
        // Trigger the email notification
        fetch("http://localhost:3002/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: buyerName,
                email: buyerEmail,
                phone: buyerPhone,
                subject: "Property Sold",
                message: `Your property has been rented to ${buyerName} for Rs.${amount}.`,
                ownerEmail: ownerEmail
            })
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error("Email error:", err));
    }, [buyerName, buyerEmail, buyerPhone, ownerEmail]);

    return (
        <>
            <h1>Payment successful</h1>
            <h2>Mail sent to the Owner</h2>
        </>
    );
}

export default PaymentSuccess;
