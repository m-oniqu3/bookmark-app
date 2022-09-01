import React, { useState } from "react";
import styled from "./Login.module.css";

import bookSitting from "../../images/book_sitting.png";
import { FcGoogle } from "react-icons/fc";

import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import Container from "../helpers/container/Container";
import { auth, provider } from "../firebase/firebase-config";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/features/auth/authSlice";

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //get path from the url
  const path = window.location.pathname;

  // login user, update store and local storage then redirect
  const handleLogin = async () => {
    setLoading(true);
    await signInWithPopup(auth, provider)
      .then(({ user }) => {
        const data = { user: user.uid, isSignedIn: true };
        dispatch(setUser(data));
        localStorage.setItem("user", JSON.stringify(data));
        navigate(`${path}`, { replace: true });
      })
      .catch((error) => alert(error));

    setLoading(false);
    props.setOpenModal(false);
  };

  return (
    <Container>
      <section className={styled.login}>
        <Container className={styled.wrap}>
          <h1>Start Organizing</h1>
          <p>
            Join BookMark and access all your favourites in one place. Organize
            your books by adding them to your library and shelves.
          </p>

          <figure className={styled.shelf}>
            <img src={bookSitting} alt="lady siting on a stack of books" />
          </figure>

          {/* disable the button when loading */}
          <button
            disabled={loading}
            className={styled["sign-in"]}
            onClick={handleLogin}
          >
            <FcGoogle size="25px" /> Sign in with Google
          </button>
        </Container>
      </section>
    </Container>
  );
};

export default Login;
