import React, { useEffect, useState } from "react";
import Navbar from "../nav/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Library from "./Library";
import Search from "./Search";
import Explore from "./Explore";
import Shelves from "./Shelves";
import NoMatch from "../helpers/routes/NoMatch";
import BookDetails from "../books/BookDetails";
import ProtectedRoute from "../helpers/routes/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { updateLibrary } from "../../store/features/library/librarySlice";
import { updateShelf } from "../../store/features/shelf/shelfSlice";
import Loading from "../helpers/loading/Loading";
import { booksCollection } from "../firebase/firebase-config";
import { onSnapshot, query, where } from "firebase/firestore";
import { toast } from "react-toastify";

const Pages = () => {
  const { feedback } = useSelector((state) => state.bookStore);
  const { shelfFeedback } = useSelector((state) => state.bookShelf);
  const { user, isSignedIn } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [dataForUser, setDataForUser] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // query to find data for the current user
    const request = query(booksCollection, where("id", "==", `${user}`));

    // get document from firebase
    const unsub = onSnapshot(request, (snapshot) => {
      setDataForUser(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
      setLoading(false);
    });

    // clean up, unsubscribe from listener
    return () => unsub();
  }, [user]);

  //update store
  useEffect(() => {
    const valid = dataForUser?.length !== 0 && dataForUser !== undefined;
    if (user && valid) {
      const { library, shelf } = dataForUser[0];

      // if library/shelf is not empty, update the store
      if (library?.length !== 0) dispatch(updateLibrary(library));
      if (Object.keys(shelf).length !== 0) dispatch(updateShelf(shelf));
    }
  }, [dataForUser, dispatch, user]);

  // show notifications when feedback is received
  useEffect(() => {
    if (feedback.message !== "") {
      const { message, type } = feedback;
      if (type === "success") toast.success(message);
      else if (type === "info") toast.info(message);
      else if (type === "warning") toast.warning(message);
    }
  }, [feedback]);

  useEffect(() => {
    if (shelfFeedback.message !== "") {
      const { message, type } = shelfFeedback;
      if (type === "success") toast.success(message);
      else if (type === "info") toast.info(message);
      else if (type === "warning") toast.warning(message);
      else if (type === "error") toast.error(message);
    }
  }, [shelfFeedback]);

  return (
    <>
      <Navbar />
      {isSignedIn && loading && <Loading />}
      <Routes>
        <Route path="/" exact element={<Home />} />

        <Route
          path="/library"
          element={
            <ProtectedRoute>
              <Library />
            </ProtectedRoute>
          }
        />

        <Route
          path="/shelves"
          element={
            <ProtectedRoute>
              <Shelves />
            </ProtectedRoute>
          }
        />

        <Route path="/search/:query" element={<Search />} />
        <Route path="/details/:bookId" element={<BookDetails />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};

export default Pages;
