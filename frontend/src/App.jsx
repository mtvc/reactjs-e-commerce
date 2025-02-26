import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateAccount from "./pages/CreateAccount/CreateAccount";
import Profil from "./pages/Profil/Profil";
import Naslovna from "./pages/Naslovna/Naslovna";
import Header from "./components/Header/Header";
import Kasa from "./pages/Kasa/Kasa";
import Queryes from "./pages/Queryes/Queryes";
// import SideMenu from "./components/SideMenu/SideMenu";
import GrupeProizvoda from "./pages/GrupeProizvoda/GrupeProizvoda";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import Dashboard from "./pages/Dashboard/Dashboard";
import Pretraga from "./pages/Pretraga/Pretraga";
import { useState } from "react";
import useFetch from "./hooks/useFetch";
import "./App.scss";
import "./MediaQueries.scss";
import Proba from "./pages/Proba/Proba";
import Onama from "./pages/Onama/Onama";

function App() {
  const apiUrl = import.meta.env.VITE_BASE_API_URL;

  // const [sgr, pid] = useParams();

  const [searching, setSearching] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const { data, isLoading, err } = useFetch(
    searching === ""
      ? `${apiUrl}/proizvodi?query=""}`
      : `${apiUrl}/proizvodi?query=${searching}`
  );

  return (
    <BrowserRouter>
      <Header
        searching={searching}
        setSearching={setSearching}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
      />

      {/* <SideMenu /> */}
      <Toaster />
      <Routes>
        <Route exact path="/" element={<Naslovna />} />
        <Route path="/:id" element={<GrupeProizvoda />} />
        {/* <Route path="/:sgr/" element={<GrupeProizvoda />} /> */}
        <Route path="/profil/" element={<Profil />} />
        {/* <Route
          path="/proizvodi/:id"
          element={<SingleProduct setShowSearch={setShowSearch} />}
        /> */}
        <Route
          path="/:sgr/:id"
          element={<SingleProduct setShowSearch={setShowSearch} />}
        />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/kasa" element={<Kasa />} />
        <Route path="/queryes" element={<Queryes />} />
        <Route path="/o-nama" element={<Onama />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/proba" element={<Proba />} />

        <Route
          path="/pretraga/"
          element={
            <Pretraga
              searching={searching}
              searchData={data}
              isLoading={isLoading}
              err={err}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
