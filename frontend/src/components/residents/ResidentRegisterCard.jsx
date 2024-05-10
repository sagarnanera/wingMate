// resident registration card component, which will take residents name, wing (will be dropdown), contact, password and flat number as input

import React, { useEffect, useState } from "react";
import { Card, Button, Select, FloatingLabel, Checkbox } from "flowbite-react";
import { Link } from "react-router-dom";
import { API_URL } from "../../utils/constants";
import { showToast } from "../../utils/showToast";
import { useDispatch } from "react-redux";
import { registerAction } from "../../actions/authAction";

const ResidenceRegisterCard = ({ token }) => {
  // it will take the token from the parent and store it in the token variable and send it to the backend when user submits the form, before that it will fetch the wing details from the backend and display it in the dropdown using token
  const [wings, setWings] = useState([]); // to store the wing details fetched from the backend

  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    name: "",
    wing: "",
    contact: "",
    password: "",
    flatNumber: "",
  });

  useEffect(() => {
    const fetchWings = async () => {
      try {
        const response = await fetch(`${API_URL}/wing`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setWings(data);
      } catch (err) {
        showToast(err.message || "Something went wrong", "error");
      }
    };

    fetchWings();
  }, [token]);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !userData.name ||
      !userData.wing ||
      !userData.contact ||
      !userData.password ||
      !userData.flatNumber
    ) {
      return showToast("Please fill all the fields", "error");
    }

    dispatch(registerAction(userData));
  };

  return (
    <Card className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Sign in to your account
      </h1>
      <div className="space-y-4 md:space-y-6">
        <div className="mt-2">
          <FloatingLabel
            variant="outlined"
            label="Name"
            className="rounded-lg"
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mt-2">
          <Select
            id="wing"
            className="rounded-lg"
            onChange={handleChange}
            required
          >
            <option value="">Select Wing</option>
            {wings.length &&
              wings.map((wing) => (
                <option key={wing._id} value={wing._id}>
                  {wing.name}
                </option>
              ))}
          </Select>
        </div>

        <div className="mt-2">
          <FloatingLabel
            variant="outlined"
            label="Contact"
            className="rounded-lg"
            type="text"
            name="contact"
            id="contact"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mt-2">
          <FloatingLabel
            variant="outlined"
            label="Password"
            className="rounded-lg"
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mt-2">
          <FloatingLabel
            variant="outlined"
            label="Flat Number"
            className="rounded-lg"
            type="text"
            name="flatNumber"
            id="flatNumber"
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center mt-4">
          <Checkbox
            id="terms"
            className="ml-1 border-gray-300 rounded bg-gray-50 dark:bg-gray-700"
            required
          />
          <label
            htmlFor="terms"
            className="ml-3 text-sm text-gray-500 dark:text-gray-300"
          >
            I agree to the terms and conditions
          </label>
        </div>
        <Button
          type="submit"
          className="w-full rounded-lg text-sm px-5 py-2.5 text-center"
          variant="primary"
          onClick={handleSubmit}
        >
          Register
        </Button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Login
          </Link>
        </p>
      </div>
    </Card>
  );
};

export default ResidenceRegisterCard;
