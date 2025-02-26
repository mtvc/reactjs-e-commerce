import React, { useState, useEffect } from "react";
import Adrese from "../../components/Formular/Adrese/Adrese";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import UsloviKoriscenja from "../../components/UsloviKoriscenja/UsloviKoriscenja";
import "./CreateAccount.scss";

function CreateAccount() {
  const [novaAdresa, setNovaAdresa] = useState([{}]);
  const [passwordVisibility, setPasswordVisibility] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [selectedType, setSelectedType] = useState("Fizičko lice"); // New state for selected type
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [email, setEmail] = useState("");
  const [sifra, setSifra] = useState("");
  const [sifraPon, setSifraPon] = useState("");
  const [mob, setMob] = useState("");
  const [tel, setTel] = useState("");
  const [kbs, setKbs] = useState(false);
  const [jbkjs, setJbkjs] = useState("");
  const [preduzece, setPreduzece] = useState("");
  const [pib, setPib] = useState("");
  const [web, setWeb] = useState("");

  useEffect(() => {
    // Add initial password visibility state for first input
    setPasswordVisibility({ 1: false });
  }, []);

  const handleNovaAdresa = () => {
    setNovaAdresa((addresses) => [
      ...addresses,
      { adresa: "", broj: "", drzava: "Srbija", mesto: "", postanskiBroj: "" },
    ]);
  };

  const togglePasswordVisibility = (num) => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [num]: !prevState[num],
    }));
    // togglePasswords(num); // Uncomment this if you have a function named togglePasswords
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "ime":
        setIme(value);
        break;
      case "prezime":
        setPrezime(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "sifra":
        setSifra(value);
        break;
      case "sifraPon":
        setSifraPon(value);
        break;
      case "mob":
        setMob(value);
        break;
      case "tel":
        setTel(value);
        break;
      case "kbs":
        setKbs(value);
        break;
      case "jbkjs":
        setJbkjs(value);
        break;
      case "preduzece":
        setPreduzece(value);
        break;
      case "pib":
        setPib(value);
        break;
      case "web":
        setWeb(value);
        break;
      default:
        break;
    }
  };

  // Function to handle change in radio button selection
  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const napraviNalog = () => {
    console.log({
      vrstaNaloga: selectedType,
      ime: ime,
      prezime: prezime,
      email: email,
      sifra: sifra,
      sifraPon: sifraPon,
      novaAdresa: novaAdresa,
      mob: mob,
      tel: tel,
      jbkjs: jbkjs,
      preduzece: preduzece,
      pib: pib,
      web: web,
    });
  };

  const napraviNalog1 = (e) => {
    e.preventDefault();
    napraviNalog();
  };

  // Toggle visibility of "privatno-lice" div
  const handlePravnoLiceToggle = (e) => {
    const isChecked = e.target.checked;
    const element = document.getElementById("privatno-lice");
    if (isChecked) {
      element.style.display = "none";
    } else {
      element.style.display = "block";
    }
  };

  return (
    <div id="content-section" style={{ marginLeft: 0 }}>
      <div className="reg-container">
        <h3>Registracija korisnika.</h3>
        <br />
        <div className="fizicko-pravno">
          <div>
            <input
              type="radio"
              id="fizicko"
              name="type"
              value="Fizičko lice"
              checked={selectedType === "Fizičko lice"}
              onChange={handleTypeChange}
            />{" "}
            <label htmlFor="fizicko">Fizičko lice</label>
          </div>
          <div>
            <input
              type="radio"
              id="pravno"
              name="type"
              value="Pravno lice"
              checked={selectedType === "Pravno lice"}
              onChange={handleTypeChange}
            />{" "}
            <label htmlFor="pravno">Pravno lice</label>
          </div>
        </div>
        {selectedType === "Pravno lice" ? (
          <div id="pravno-lice" className="row g-4">
            <div id="kbs" className="col-md-12">
              <div className="col-md-3">
                <label htmlFor="inputKbs" className="form-label">
                  Korisnik budžetskih sredstava
                </label>
                {"  "}
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={setKbs}
                ></input>
              </div>
              <div id="jbjks" className="col-md-3">
                <label htmlFor="inputJbkjs" className="form-label">
                  JBKJS
                </label>{" "}
                <input
                  className="form-control"
                  type="text"
                  onChange={setJbkjs}
                ></input>
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputPreduzece" className="form-label">
                Naziv preduzeća
              </label>
              <input
                type="text"
                className="form-control"
                id="inputPreduzece"
                name="preduzece"
                value={preduzece}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-2">
              <label htmlFor="inputPib" className="form-label">
                PIB
              </label>
              <input
                type="number"
                className="form-control"
                id="inputPib"
                name="pib"
                value={pib}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="inputWebsite" className="form-label">
                Web sajt
              </label>
              <input
                type="text"
                className="form-control"
                id="inputWeb"
                name="web"
                value={web}
                onChange={handleChange}
              />
            </div>
          </div>
        ) : (
          <div id="privatno-lice" className="row g-4">
            <div className="col-md-4">
              <label htmlFor="inputIme" className="form-label">
                Ime*
              </label>
              <input
                type="text"
                className="form-control"
                id="inputIme"
                name="ime"
                value={ime}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="inputPrezime" className="form-label">
                Prezime*
              </label>
              <input
                type="text"
                className="form-control"
                id="inputPrezime"
                name="prezime"
                value={prezime}
                onChange={handleChange}
              />
            </div>
          </div>
        )}
        <div id="oba-lica" className="row g-4">
          <div className="col-md-4">
            <label htmlFor="inputEmail4" className="form-label">
              Email*
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail4"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 position-relative">
            <label htmlFor="inputSifra1" className="form-label">
              Šifra*
            </label>
            <input
              type={passwordVisibility[1] ? "text" : "password"}
              className="form-control"
              id="inputSifra1"
              name="sifra"
              value={sifra}
              onChange={handleChange}
            />
            <i
              className={`bi ${
                passwordVisibility[1] ? "bi-eye" : "bi-eye-slash"
              } spy`}
              id="togglePassword1"
              onClick={() => togglePasswordVisibility(1)}
            ></i>
          </div>
          <div className="col-md-4 position-relative">
            <label htmlFor="inputSifra2" className="form-label">
              Ponovi šifru*
            </label>
            <input
              type={passwordVisibility[2] ? "text" : "password"}
              className="form-control"
              id="inputSifra2"
              name="sifraPon"
              value={sifraPon}
              onChange={handleChange}
            />
            <i
              className={`bi ${
                passwordVisibility[2] ? "bi-eye" : "bi-eye-slash"
              } spy`}
              id="togglePassword2"
              onClick={() => togglePasswordVisibility(2)}
            ></i>
          </div>
          <div className="col-md-4">
            <label htmlFor="inputMob" className="form-label">
              Mobilni telefon*
            </label>
            <input
              type="text"
              className="form-control"
              id="inputMob"
              name="mob"
              value={mob}
              onChange={handleChange}
            />
          </div>
          {/* <div className="col-md-4">
            <label htmlFor="inputTel" className="form-label">
              Telefon
            </label>
            <input
              type="text"
              className="form-control"
              id="inputTel"
              name="tel"
              value={tel}
              onChange={handleChange}
            />
          </div> */}
        </div>
        {novaAdresa.map((_, i) => (
          <React.Fragment key={i}>
            <Adrese
              broj={i}
              setNovaAdresa={setNovaAdresa}
              novaAdresa={novaAdresa}
            />
          </React.Fragment>
        ))}
        <div className="dodaj-adresu col-12">
          <button
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              handleNovaAdresa();
            }}
          >
            <i className="bi bi-plus-circle"></i> Dodaj novu adresu za dostavu.
          </button>
        </div>

        <div className="col-12">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="gridCheck"
            />{" "}
            <label className="form-check-label" htmlFor="gridCheck">
              Slažem se sa{" "}
              <Link
                onClick={() => setOpenModal(!openModal)}
                className="link"
                to="#"
              >
                uslovima
              </Link>
            </label>
            <Modal
              id="uslovi"
              isOpen={openModal}
              onClose={() => setOpenModal(false)}
            >
              <UsloviKoriscenja />
            </Modal>
          </div>
        </div>
        <div className="col-12 napravi-nalog">
          <button
            type="submit"
            className="btn btn-warning"
            onClick={napraviNalog1}
          >
            <i className="bi bi-person-fill-add"></i> Napravi nalog
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
