import { useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import useFetch from "../../hooks/useFetch";
import useSortBy from "../../hooks/useSortBy";

function Queryes() {
  const { data, isLoading, err } = useFetch(`http://localhost:8081/queryes/`);
  const { dataArr, setDataArr, sorting } = useSortBy(data);

  console.log(dataArr);

  useEffect(() => {
    if (dataArr && dataArr.length > 0) {
      setDataArr();
      sorting("count");
    }
  }, []);

  if (isLoading) return <Loader />;

  if (err) {
    console.error(err);
    return null;
  }
  return (
    <div className="container col">
      <table className="table table-bordered">
        {dataArr?.length === 0 ? (
          <thead>
            <tr>
              <th>Nema upita.</th>
            </tr>
          </thead>
        ) : (
          <thead>
            <tr>
              <th>ID</th>
              <th>Tekst</th>
              <th
                onClick={() => sorting("count")}
                style={{ cursor: "pointer" }}
              >
                Broj upita
              </th>
            </tr>
          </thead>
        )}
        <tbody>
          {dataArr?.map(
            (d, i) =>
              d.text.length < 50 &&
              Number(d.count) > 100 &&
              d.text !== "Pretraga..." && (
                <tr key={i}>
                  <td>{d.ID}</td>
                  <td>{d.text}</td>
                  <td>{d.count}</td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Queryes;
