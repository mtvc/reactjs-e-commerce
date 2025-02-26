import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";
import AllProducts from "../AllProducts/AllProducts";
import "./Groups.scss";

function Groups() {
  const apiUrl = import.meta.env.VITE_BASE_API_URL;
  const siteUrl = import.meta.env.VITE_BASE_SITE_URL;

  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, err } = useFetch(`${apiUrl}/grupe/${id}`);

  if (isLoading) return <Loader />;

  if (err) {
    console.error(err);
    return null;
  }

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-1 g-3 ">
        <div className="col grupe-proizvodi">
          {data?.length === 0 ? (
            <div className="container-fluid col-12 grupe-proizvoda">
              <AllProducts />
            </div>
          ) : (
            data?.map((item, index) => (
              <div
                className="card"
                key={index}
                onClick={() =>
                  navigate(`/${item.sifra_grupe}`, { replace: true })
                }
                style={{ cursor: "pointer" }}
              >
                <img
                  className="card-img-top"
                  src={
                    item.slika
                      ? `${siteUrl}/${item.slika}`
                      : `${siteUrl}/bez_slike_3.png`
                  }
                  alt="..."
                />
                <div className="card-body">
                  <span className="card-title">{item.naziv}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Groups;
