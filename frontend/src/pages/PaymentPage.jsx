// payment page, which will display the payment cards.

import React, { useState } from "react";

import PaymentCard from "../components/payment/PaymentCard";
import { Button, Card, Label, TextInput } from "flowbite-react";

import { MdAssignmentAdd, MdOutlineKeyboardBackspace } from "react-icons/md";

// import PaymentForm from "../components/event/PaymentForm";
import { useNavigate } from "react-router-dom";
import DateRangePicker from "../components/shared/DateRangePicker";
// import { useDispatch, useSelector } from "react-redux";
// import { getPaymentsAction } from "../actions/eventAction";
// import Loader from "../components/shared/Loader";

const PaymentPage = () => {
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

  const navigate = useNavigate();

  const [dateFilter, setDateFilter] = useState({
    startDate: "",
    endDate: "",
  });

  // TODO: implement debounce for the search filter
  const [searchFilter, setSearchFilter] = useState("");

  const handleDeletePayment = (paymentId) => {
    // setPayments(events.filter((event) => event._id !== eventId));
    console.log("Delete payment with id: ", paymentId);
  };

  const handleDateRangeChange = (date) => {
    if (date.from === "startDate") {
      setDateFilter({ ...dateFilter, startDate: date.startDate });
    } else {
      setDateFilter({ ...dateFilter, endDate: date.endDate });
    }
  };

  //   if (loading) {
  //     return (
  //       <Card className="w-full h-full flex justify-center items-center p-4 mt-4">
  //         <Loader size={"2xl"} />
  //       </Card>
  //     );
  //   }

  //   if (error) {
  //     return (
  //       <Card className="w-full flex justify-center items-center p-4 mt-4">
  //         <h1 className="text-2xl font-semibold text-gray-800 my-4 justify-center text-center">
  //           Error fetching events
  //         </h1>
  //         <Button className="" onClick={() => location.reload()}>
  //           {" "}
  //           Refresh page
  //         </Button>
  //       </Card>
  //     );
  //   }

  return (
    <>
      {/* header section */}
      <Card
        theme={{
          root: {
            children: "flex h-full flex-col justify-center gap-4 p-3",
          },
        }}
      >
        <div className="flex justify-between items-center gap-2">
          <Button color="gray" className="my-4" onClick={() => navigate(-1)}>
            <MdOutlineKeyboardBackspace className="lg:mr-2 h-4 w-4" />
            <span className="hidden lg:block">Back</span>
          </Button>

          <h1 className="text-3xl font-semibold text-gray-800 my-4 justify-center text-center flex-grow -ml-16">
            Payments
          </h1>
        </div>

        {/* filter */}
        <div className="flex justify-between flex-wrap gap-2 items-center my-2">
          <div className="w-full lg:w-[calc(50%-3rem)]">
            <Label htmlFor="search" className="text-gray-800">
              Search payments
            </Label>

            <TextInput
              id="search"
              variant="outlined"
              type="text"
              sizing="md"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
          </div>

          <div className="flex justify-center items-center gap-2 w-full lg:w-[calc(50%-3rem)]">
            <DateRangePicker
              dateRange={dateFilter}
              handleDateChange={handleDateRangeChange}
            />
          </div>
        </div>
      </Card>

      {/* Display Payments */}
      {payments.length === 0 ? (
        <Card className="w-full flex justify-center items-center p-4 mt-4">
          <h1 className="text-2xl font-semibold text-gray-800 my-4 justify-center text-center">
            No payments available
          </h1>
        </Card>
      ) : (
        <div className="flex gap-2 flex-wrap justify-around mt-4">
          {payments.map((payment) => (
            <PaymentCard
              key={payment._id}
              paymentData={payment}
              onDelete={handleDeletePayment}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default PaymentPage;
