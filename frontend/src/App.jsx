import Router from "./routes/routes";

import Login from "./pages/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAction } from "./actions/userAction";
import { getUser } from "./reducers/userReducer";
import Loader from "./components/shared/Loader";
import { showToast } from "./utils/showToast";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getUserAction());
    }, 4000);
    // dispatch(getUserAction());

    return () => clearTimeout(timer);
  }, [dispatch]);

  const { loading, error } = useSelector((state) => state.user);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    showToast(error, "error");
    // console.log(error,26);
  }

  return <Router />;
}

export default App;
