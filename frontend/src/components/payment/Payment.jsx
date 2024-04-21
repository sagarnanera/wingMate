// payment page, which will display the payment cards.

import React from "react";

import PaymentCard from "./PaymentCard";

const Payment = () => {
  const payments = [
    {
      _id: "1",
      name: "Payment A",
      amount: 1000,
      status: "success",
      paymentDate: "2021-10-01",
    },
    {
      _id: "2",
      name: "Payment B",
      amount: 2000,
      status: "pending",
      paymentDate: "2021-10-11",
    },
    {
      _id: "3",
      name: "Payment C",
      amount: 3000,
      status: "failed",
      paymentDate: "2021-10-21",
    },
    {
      _id: "4",
      name: "Payment D",
      amount: 4000,
      status: "success",
      paymentDate: "2021-11-01",
    },
  ];

  return (
    <div className="h-screen overflow-scroll p-2">
      {payments?.length &&
        payments.map((payment) => (
          <PaymentCard key={payment._id} paymentData={payment} />
        ))}
    </div>
  );
};

export default Payment;
