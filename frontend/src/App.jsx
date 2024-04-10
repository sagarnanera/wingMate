import Router from "./routes/routes";

import Login from "./pages/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAction } from "./actions/userAction";
import { getUser } from "./reducers/userReducer";
import Loader from "./components/shared/Loader";
import { showToast } from "./utils/showToast";
import { getSocietyAction } from "./actions/societyAction";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAction());
    dispatch(getSocietyAction());
  }, [dispatch]);

  const { loading, error } = useSelector((state) => state.user);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center p-4 mt-4">
        <Loader />
      </div>
    );
  }

  // if (error) {
  //   showToast(error, "error");
  // }

  return <Router />;
}

export default App;
