import "./Artikal.scss";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import useFetch from "../../hooks/useFetch";
import RightContainer from "../RightContainer/RightContainer";
import ProductGallery from "../ProductGallery/ProductGallery";

function Artikal() {
  const apiUrl = import.meta.env.VITE_BASE_API_URL;
  const siteUrl = import.meta.env.VITE_BASE_SITE_URL;

  const { sgr, id } = useParams();
  const { data, isLoading, err } = useFetch(`${apiUrl}/artikl/${id}`);

  // console.log(`data from artikal: ${data?.sifra}`);

  // console.log(`sifra grupe: ${sgr} sifra artikla: ${id}`);

  if (isLoading) return <Loader />;
  if (err)
    return (
      <div className="container">
        <h1>404 - Stranica nije pronađena.</h1>
      </div>
    );

  return (
    <>
      <div className="container">
        <div className="artikal" key={id}>
          <div className="product-image ">
            {!data?.putanja ? (
              <img src={`${siteUrl}/${data?.slikaV || "bez_slike_3.png"}`} />
            ) : (
              <ProductGallery id={id} />
            )}
          </div>

          <div className="product-data">
            <div className="sifra-single-product">
              <p>Šifra: {id}</p>
            </div>
            <div className="brand">
              <p>Brend: {data?.proizvodjac}</p>
            </div>
            <div className="pdf">
              {data?.pdf_spec && (
                <a href={`${siteUrl}/${data?.pdf_spec}`} target="_blank">
                  PDF <i className="bi bi-file-earmark-arrow-down"></i>
                </a>
              )}
            </div>
          </div>
          <div className="product-title">
            <h1>{data?.naziv}</h1>
          </div>
          <div className="description-single-product">
            <p>
              <b>{data?.naziv_veliki}</b>
            </p>
          </div>
          <div className="specifikacija-single-product">
            {!data?.specifikacija ? (
              ""
            ) : (
              <ul className="spec">
                {data?.specifikacija
                  .replace(";", ",")
                  .split(",")
                  .map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
              </ul>
            )}
          </div>
        </div>
        <RightContainer data={data} id={id} />
      </div>
    </>
  );
}

export default Artikal;
