import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import useSortBy from "../../../hooks/useSortBy";
import Loadersmall from "../../Loader/Loadersmall";
import Modal from "../../../components/Modal/Modal";
import "./Proizvodi.scss";
import EditProizvoda from "../EditProizvoda/EditProizvoda";

function Proizvodi() {
  const apiUrl = import.meta.env.VITE_BASE_API_URL;
  const [artId, setArtId] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [pret, setPret] = useState("");
  const { data, isLoading, err } = useFetch(`${apiUrl}/artikli/`);
  const { dataArr, setDataArr, sorting } = useSortBy(data);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (dataArr) {
      setDataArr(data);
      sorting("cena");
    }
  }, []);

  useEffect(() => {
    if (pret === "" || pret.length < 3) {
      setFilteredData(dataArr);
    } else {
      setFilteredData(
        dataArr?.filter(
          (d) =>
            d.naziv.toLowerCase().includes(pret.toLowerCase()) ||
            d.proizvodjac.toLowerCase().includes(pret.toLowerCase()) ||
            d.sifra.toString().includes(pret)
        )
      );
    }
  }, [pret, dataArr]);

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
            placeholder="Pretraga proizvoda..."
            aria-label="Search"
            id="proizvodi-search-bar"
            onChange={(e) => setPret(e.target.value)}
          />
        </div>
      </div>
      <div className="container-fluid dash-proizvodi">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Šifra</th>
              <th>Skraćeni naziv</th>
              <th>Proizvođač</th>
              <th>Stanje</th>
              <th onClick={() => sorting("cena")} style={{ cursor: "pointer" }}>
                Cena
              </th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {filteredData?.map(
              (d, i) =>
                d.naziv.length > 2 && (
                  <tr key={i}>
                    <td>{d.sifra}</td>
                    <td>{d.naziv}</td>
                    <td>{d.proizvodjac}</td>
                    <td>{d.nalageru}</td>
                    <td>{d.cena}</td>
                    <td>
                      <button
                        onClick={() => {
                          setArtId(d.sifra);
                          setOpenModal(!openModal);
                        }}
                        className="btn btn-primary btn-update-proizvoda"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
        <Modal
          id="edit-proizvoda"
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
        >
          <EditProizvoda artId={artId} />
        </Modal>
      </div>
    </>
  );
}

export default Proizvodi;
