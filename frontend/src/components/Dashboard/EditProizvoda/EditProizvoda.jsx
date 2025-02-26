import { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import Loadersmall from "../../Loader/Loadersmall";
import "./EditProizvoda.scss";

function EditProizvoda({ artId }) {
  const apiUrl = import.meta.env.VITE_BASE_API_URL;
  const { data, isLoading, err } = useFetch(`${apiUrl}/artikl/${artId}`);

  const initialState = {
    sifra: "",

    sifra_nad_grupe: "",
    naziv: "",
    naziv_veliki: "",
    proizvodjac: "",
    jedmere: "",
    slika_teh_crteza: "",
    slikaV: "",
    slikaM: "",
    slikaI: "",
    pdf_spec: "",
    cena: "",
    nalageru: "",
    specifikacija: "",
    jed_kolicine: "",
    imapopust: "",
    putanja: "",
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (data) {
      setState({
        sifra: data.sifra || "",
        sifra_nad_grupe: data.sifra_nad_grupe || "",
        naziv: data.naziv || "",
        naziv_veliki: data.naziv_veliki || "",
        proizvodjac: data.proizvodjac || "",
        jedmere: data.jedmere || "",
        slika_teh_crteza: data.slika_teh_crteza || "",
        slikaV: data.slikaV || "",
        slikaM: data.slikaM || "",
        slikaI: data.slikaI || "",
        pdf_spec: data.pdf_spec || "",
        cena: data.cena || "",
        nalageru: data.nalageru || "",
        specifikacija: data.specifikacija || "",
        jed_kolicine: data.jed_kolicine || "",
        imapopust: data.imapopust || "",
        putanja: data.putanja || "",
      });
    }
  }, [data]);

  if (isLoading) return <Loadersmall />;

  if (err) {
    console.error(err);
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission logic here
  };

  return (
    <div className="col-md-12 ">
      <form className="edit-proizvoda" onSubmit={handleSubmit}>
        <div className="col-md-2">
          <label htmlFor="sifra" className="form-label">
            <b>Šifra proizvoda</b>
          </label>
          <input
            type="text"
            className="form-control"
            id="sifra-proizvoda"
            name="sifra"
            value={state.sifra}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="cena" className="form-label">
            <b>Cena</b>
          </label>
          <input
            type="text"
            className="form-control"
            id="cena-art"
            name="cena"
            value={state.cena}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-5">
          <label htmlFor="naziv" className="form-label">
            <b>Naziv proizvoda</b>
          </label>
          <input
            type="text"
            className="form-control"
            id="naziv-proizvoda"
            name="naziv"
            value={state.naziv}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-2">
          <label htmlFor="sifra_nad_grupe" className="form-label">
            <b>Šifra nad grupe</b>
          </label>
          <input
            type="text"
            className="form-control"
            id="sifra-nad-grupe"
            name="sifra_nad_grupe"
            value={state.sifra_nad_grupe}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-9">
          <label htmlFor="naziv_veliki" className="form-label">
            <b>Naziv veliki</b>
          </label>
          <input
            type="text"
            className="form-control"
            id="naziv-veliki"
            name="naziv_veliki"
            value={state.naziv_veliki}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="jedmere" className="form-label">
            <b>Jedinica mere</b>
          </label>
          <input
            type="text"
            className="form-control"
            id="jedinica-mere"
            name="jedmere"
            value={state.jedmere}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="slika_teh_crteza" className="form-label">
            <b>Slika tehničkog crteža</b>
          </label>
          <input
            type="text"
            className="form-control"
            id="slika-teh-crteza"
            name="slika_teh_crteza"
            value={state.slika_teh_crteza}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="slikaV" className="form-label">
            <b>SlikaV</b>
          </label>
          <input
            type="text"
            className="form-control"
            id="slika-v"
            name="slikaV"
            value={state.slikaV}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="slikaM" className="form-label">
            <b>SlikaM</b>
          </label>
          <input
            type="text"
            className="form-control"
            id="slika-m"
            name="slikaM"
            value={state.slikaM}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="slikaI" className="form-label">
            <b>SlikaI</b>
          </label>
          <input
            type="text"
            className="form-control"
            id="slika-i"
            name="slikaI"
            value={state.slikaI}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="putanja" className="form-label">
            <b>Slike galerije</b>
          </label>
          <input
            type="text"
            className="form-control"
            id="putanja-img"
            name="putanja"
            value={state.putanja}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="pdf_spec" className="form-label">
            <b>Pdf specifikacija</b>
          </label>
          <input
            type="text"
            className="form-control"
            id="pdf-spec"
            name="pdf_spec"
            value={state.pdf_spec}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="proizvodjac" className="form-label">
            <b>Proizvođač</b>
          </label>
          <input
            type="text"
            className="form-control"
            id="proizvodjac-proizvoda"
            name="proizvodjac"
            value={state.proizvodjac}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="nalageru" className="form-label">
            <b>Na lageru</b>
          </label>
          <input
            type="text"
            className="form-control"
            id="na-lageru"
            name="nalageru"
            value={state.nalageru}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="jed_kolicine" className="form-label">
            <b>Jedinica kolicine</b>
          </label>
          <input
            type="text"
            className="form-control"
            id="jed-kolicine"
            name="jed_kolicine"
            value={state.jed_kolicine}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="imapopust" className="form-label">
            <b>Ima popust</b>
          </label>
          <input
            type="text"
            className="form-control"
            id="ima-popust"
            name="imapopust"
            value={state.imapopust}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="specifikacija" className="form-label">
            <b>Specifikacija</b>
          </label>
          <textarea
            type="text"
            rows="5"
            className="form-control"
            id="spec-art"
            name="specifikacija"
            value={state.specifikacija}
            onChange={handleChange}
          />
        </div>

        <div className="update-button-container">
          <button className="btn btn-primary" type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProizvoda;
