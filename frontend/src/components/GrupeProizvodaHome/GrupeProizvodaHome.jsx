import { useNavigate } from "react-router-dom";
import AllProducts from "../AllProducts/AllProducts";
import Loader from "../Loader/Loader";
import "./GrupeProizvodaHome.scss";
import useFetch from "../../hooks/useFetch";

function GrupeProizvoda({ grupaId }) {
  const apiUrl = import.meta.env.VITE_BASE_API_URL;
  const siteUrl = import.meta.env.VITE_BASE_SITE_URL;

  const navigate = useNavigate();

  const { data, isLoading, err } = useFetch(`${apiUrl}/grupe/${grupaId}`);
  console.log(`Home data: ${data}`);

  if (isLoading) return <Loader />;

  if (err) {
    console.error(err);
    return null;
  }

  return (
    <div className="produkti">
      {data?.length === 0 ? (
        <div className="">
          <AllProducts />
        </div>
      ) : (
        data?.map((item, index) => (
          <div
            className="card"
            key={index}
            onClick={() => navigate(`/${item.sifra_grupe}`, { replace: true })}
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
  );
}

export default GrupeProizvoda;
