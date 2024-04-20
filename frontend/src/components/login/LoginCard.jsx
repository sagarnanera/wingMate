import React, { useState } from "react";
import { Button, Card, Checkbox, FloatingLabel } from "flowbite-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../actions/authAction";
import Loader from "../shared/Loader";
import { showToast } from "../../utils/showToast";

const LoginCard = () => {
  const dispatch = useDispatch();

  // const toast = useToast();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  // const { user } = useSelector((state) => state.user);

  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // validation
    if (!userData.email || !userData.password) {
      showToast("Please fill all fields", "error");
      return;
    }

    dispatch(loginAction(userData));
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
            label="Email"
            className="rounded-lg"
            type="email"
            name="email"
            id="email"
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

        <div className="flex items-center justify-between">
          <div className="flex items-start">
            <Checkbox
              id="remember"
              aria-describedby="remember"
              className=" w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
            />
            <label
              htmlFor="remember"
              className="ml-3 text-sm text-gray-500 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>
          <Link
            to="#"
            className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Forgot password?
          </Link>
        </div>
        <Button
          type="submit"
          className="w-full rounded-lg text-sm px-5 py-2.5 text-center"
          variant="primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <Loader variant={"tiny"} size={"lg"} /> : "Sign in"}
        </Button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Don&apos;t have an account yet?{" "}
          <Link
            to="/society-register"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Sign up
          </Link>
        </p>
      </div>
    </Card>
  );
};

export default LoginCard;
