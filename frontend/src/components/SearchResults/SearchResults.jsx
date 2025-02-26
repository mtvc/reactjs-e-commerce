import { useEffect, useState } from "react";
import Quantity from "../Quantity/Quantity";
import AddToCart from "../AddToCart/AddToCart";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";

function SearchResults({ searching, searchData, isLoading, err }) {
  const siteUrl = import.meta.env.VITE_BASE_SITE_URL;

  const [quantities, setQuantities] = useState([]);

  const handleQuantityChange = (index, newQuantity) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = [...prevQuantities];
      updatedQuantities[index] = newQuantity;
      return updatedQuantities;
    });
  };

  // Loading state
  if (isLoading) {
    return <Loader />;
  }

  // Error state
  if (err) {
    return <div>Error: {err}</div>;
  }

  return (
    <div className="container">
      {searching === "" || searching.length === 1 ? (
        <h3>Nema rezultata pretrage.</h3>
      ) : (
        <>
          {searchData.length === 2 ? (
            <h3>Pronađen 1 proizvod.</h3>
          ) : (
            <h3>Pronađeno {searchData.length} proizvoda.</h3>
          )}

          {searchData?.map(
            (d, i) =>
              d.naziv !== "Slobodno " && (
                <div className="productColumn" key={d.sifra}>
                  <Link to={`/proizvodi/${d.sifra}`}>
                    <div className="product-slika">
                      {d.slikaM === "" ? (
                        <img
                          src={`${siteUrl}/bez_slike_4.png`}
                          alt="No image"
                        />
                      ) : (
                        <img src={`${siteUrl}/${d.slikaI}`} alt="Product" />
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
                    <div>
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
                        data={searchData[i]}
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

export default SearchResults;
