import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { booksCollection } from "../components/firebase/firebase-config";

const useGetDataFromFirebase = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [dataForUser, setDataForUser] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const getData = async () => {
    setLoading(true);
    const data = await getDocs(booksCollection).then((snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return { document: doc.data(), id: doc.id };
      });
      return data;
    });
    setData(data);
    setLoading(false);
  };
  //get the userData from firebase
  useEffect(() => {
    getData().catch((error) => alert(error));
  }, []);

  //when the data is available get the data for the current user
  useEffect(() => {
    if (data && data.length !== 0) {
      const currentUserData = data.find((item) => item.id === user);
      setDataForUser(currentUserData?.document?.userData);
    }
  }, [data, user]);

  return [dataForUser, loading];
};

export default useGetDataFromFirebase;
