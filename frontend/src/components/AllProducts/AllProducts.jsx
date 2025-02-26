import useFetch from "../../hooks/useFetch";
import { Link, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import Quantity from "../Quantity/Quantity";
import { useState } from "react";
import "./AllProducts.scss";
import AddToCart from "../AddToCart/AddToCart";

function AllProducts() {
  const apiUrl = import.meta.env.VITE_BASE_API_URL;
  const siteUrl = import.meta.env.VITE_BASE_SITE_URL;

  const { id } = useParams();

  const { data, isLoading, err } = useFetch(`${apiUrl}/artikli/${id}`);

  const [quantities, setQuantities] = useState([]);

  if (isLoading) return <Loader />;

  if (err) {
    console.error(err);
    return null;
  }

  const handleQuantityChange = (index, newQuantity) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = [...prevQuantities];
      updatedQuantities[index] = newQuantity;
      return updatedQuantities;
    });
  };
  return (
    <div className="container">
      {data?.length === 0 ? (
        <>
          <h3>Nema proizvoda.</h3>
        </>
      ) : (
        <>
          {data?.map(
            (d, i) =>
              d.naziv !== "Slobodno " &&
              d.cena !== 0 && (
                <div className="productColumn" key={d.sifra}>
                  <Link to={`/${d.sifra_nad_grupe}/${d.sifra}`}>
                    <div className="product-slika">
                      {d.slikaM === "" ? (
                        <img src={`${siteUrl}/bez_slike_4.png`} />
                      ) : (
                        <img src={`${siteUrl}/${d.slikaI}`} />
                      )}
                    </div>
                    <div className="product-grupa">
                      <div>{d.sifra}</div>
                      <div>
                        Na stanju:{" "}
                        {d.nalageru === 0 ? (
                          <i className="bi bi-x-lg" style={{ color: "red" }} />
                        ) : (
                          <i
                            className="bi bi-check-lg"
                            style={{ color: "green" }}
                          />
                        )}
                      </div>
                    </div>
                    <div className="tekst-artikla">
                      <div>
                        <b>{d.naziv}</b>
                      </div>
                      <div className="product-opis">{d.naziv_veliki}</div>
                    </div>
                  </Link>
                  <div className="product-grupa">
                    <div>
                      <span>{d.cena} din</span>
                    </div>
                    <div>
                      <Quantity
                        initialQuantity={quantities[i] || 1}
                        onQuantityChange={(newQuantity) =>
                          handleQuantityChange(i, newQuantity)
                        }
                      />
                    </div>
                    <div>
                      <AddToCart
                        data={data[i]}
                        id={d.sifra}
                        quantity={quantities[i]}
                      >
                        <i className="bi bi-basket"></i> U korpu
                      </AddToCart>
                    </div>
                  </div>
                </div>
              )
          )}
        </>
      )}
    </div>
  );
}
export default AllProducts;
