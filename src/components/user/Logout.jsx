import React from "react";
import styled from "./Logout.module.css";
import { TbLogout } from "react-icons/tb";
import { MdCancel } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "../helpers/container/Container";
import { signUserOut } from "../firebase/firebase-config";
import { clearLibrary } from "../../store/features/library/librarySlice";
import { clearShelf } from "../../store/features/shelf/shelfSlice";
import { setUser } from "../../store/features/auth/authSlice";

const Logout = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setOpenLogoutModal } = props;

  // close modal
  const handleCancel = () => setOpenLogoutModal(false);

  //  sign user out and clear library and shelf
  const handleLogout = async () => {
    await signUserOut();
    dispatch(setUser({}));
    dispatch(clearLibrary());
    dispatch(clearShelf());
    navigate("/", { replace: true });
    if (props.closeMenu) props.closeMenu(false);
    setOpenLogoutModal(false);
  };

  return (
    <section className={styled.logout}>
      <MdCancel className={styled.close} size={30} onClick={handleCancel} />
      <Container>
        <TbLogout className={styled.icon} size={35} color="var(--yellow)" />
        <h1>Logout</h1>
        <p className="para">
          Are you sure you want to logout? Don't worry, your progress will be
          saved. You can always log back in.
        </p>
        <div className="button-actions">
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </Container>
    </section>
  );
};

export default Logout;
