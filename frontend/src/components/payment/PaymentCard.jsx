// payment card, which will display the payment details like name, amount, status, paymentDate and view more button.

import React from "react";

import { Button, Card } from "flowbite-react";
import { MdPayment } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { formateDate } from "../../utils/formateDate";

const PaymentCard = ({ paymentData }) => {
  const navigate = useNavigate();
  return (
    <Card className="w-full mb-2 md:w-[calc(50%-0.5rem)] md:gap-2 lg:w-[calc(33%-1rem)] lg:gap-4 xl:w-[calc(25%-1.5rem)] xl:gap-6 flex items-center p-4">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 my-4 justify-center text-center">
          {paymentData.name}
        </h1>
      </div>
      <div>
        <p className="text-gray-600 mb-2">Amount: {paymentData.amount}</p>
        <p className="text-gray-600 mb-2">Status: {paymentData.status}</p>
        <p className="text-gray-600 mb-2">
          Payment Date: {formateDate(paymentData.paymentDate)}
        </p>
      </div>
      {/* view more button, which will navigate to payment details page
      <Button
        color="blue"
        className="mt-4"
        onClick={() => navigate(`/payments/${paymentData?._id}`)}
      >
        View More
      </Button> */}
    </Card>
  );
};

export default PaymentCard;
