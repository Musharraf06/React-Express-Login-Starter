import React, { useEffect, useState } from "react";
import axios from "axios";
import { Alert } from "rsuite";

const Home = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState(null);

  useEffect(() => {
    document.title = "Home";
    axios.post("http://localhost:5000/verify", { token: token }).then((res) => {
      setData(res.data.data);
    });
  }, []);

  return (
    <>
      {data ? (
        <div>
          <button
            onClick={() => {
              Alert.info(data.username, 2000);
            }}
          >
            Click to see your username
          </button>
        </div>
      ) : (
        <div>
          Tampering in data found. <a href="/login">Login</a> again
        </div>
      )}
    </>
  );
};

export default Home;
