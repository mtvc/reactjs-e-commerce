import axios from "axios";
import { useState } from "react";
import "./Obavestenja.scss";
import Loadersmall from "../Loader/Loadersmall";

function Obavestenja() {
  const apiUrl = import.meta.env.VITE_BASE_API_URL;
  const [isLoading, setIsLoading] = useState(false); // Initialize isLoading to false
  const [text, setText] = useState("");

  const handlePostData = (event) => {
    event.preventDefault();
    setIsLoading(true);
    axios
      .post(`${apiUrl}/obavestenja`, { text })
      .then((res) => {
        console.log(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <div className="obavestenja">
      <h5>Obaveštenja:</h5>
      <form id="obavestenja" onSubmit={handlePostData}>
        <input type="text" />
        <button className="btn btn-primary" type="submit">
          {isLoading ? (
            <Loadersmall />
          ) : (
            <i className="bi bi-pencil-square" style={{ color: "#fff" }} />
          )}{" "}
          Objavi
        </button>
      </form>
    </div>
  );
}

export default Obavestenja;
