import { useEffect, useState } from "react";
import "./GrupeDash.scss";
import useFetch from "../../../hooks/useFetch";
import useSortBy from "../../../hooks/useSortBy";
import Loadersmall from "../../Loader/Loadersmall";

function GrupeDash() {
  const apiUrl = import.meta.env.VITE_BASE_API_URL;
  const [pret1, setPret1] = useState("");
  const { data, isLoading, err } = useFetch(`${apiUrl}/grupe/`);
  const { dataArr, setDataArr, sorting } = useSortBy(data);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (dataArr) {
      setDataArr(data);
      sorting("cena");
    }
  }, []);

  useEffect(() => {
    if (pret1 === "" || pret1.length < 3) {
      setFilteredData(dataArr);
    } else {
      setFilteredData(
        dataArr?.filter(
          (d) =>
            d.naziv.toLowerCase().includes(pret1.toLowerCase()) ||
            d.sifra_nadgrupe.toString().includes(pret1) ||
            d.sifra_grupe.toString().includes(pret1)
        )
      );
    }
  }, [pret1, dataArr]);

  if (isLoading) return <Loadersmall />;

  if (err) {
    console.error(err);
    return null;
  }

  return (
    <>
      <div className="proizvodi-pretraga">
        <div className="col-4">
          <input
            className="form-control shadow-none "
            type="search"
            placeholder="Pretraga grupa..."
            aria-label="Search"
            id="proizvodi-search-bar"
            onChange={(e) => setPret1(e.target.value)}
          />
        </div>
        <button className="btn btn-primary dash-butt">
          <i className="bi bi-plus-circle"></i> Dodaj novu grupu
        </button>
      </div>
      <div className="container-fluid dash-proizvodi">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Šifra grupe</th>
              <th>Šifra nad grupe</th>
              <th>Naziv</th>
              <th>Podnivo</th>
              <th>Nivo</th>
              <th
                onClick={() => sorting("slika")}
                style={{ cursor: "pointer" }}
              >
                Ima sliku
              </th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {filteredData?.map(
              (d, i) =>
                d.naziv.length > 2 && (
                  <tr key={i}>
                    <td>{d.sifra_grupe}</td>
                    <td>{d.sifra_nadgrupe}</td>
                    <td>{d.naziv}</td>
                    <td>{d.podnivo}</td>
                    <td>{d.nivo}</td>
                    <td>{d.slika.length > 0 ? "✅" : "❌"}</td>
                    <td>
                      <button className="btn btn-primary">Edit.</button>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default GrupeDash;
