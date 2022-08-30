import React, { useEffect } from "react";
import "./App.css";
import Pages from "./components/pages/Pages";
import { useDispatch } from "react-redux";
import { setUser } from "./store/features/auth/authSlice";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

function App() {
  const dispatch = useDispatch();

  // check if user data is stored in localStorage and update the store
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) dispatch(setUser(user));
  }, [dispatch]);

  return (
    <>
      <ReactNotifications isMobile={true} />
      <Pages />
    </>
  );
}

export default App;
