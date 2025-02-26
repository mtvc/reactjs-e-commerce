import Quantity from "../Quantity/Quantity";
import { useState } from "react";
import AddToCart from "../AddToCart/AddToCart";
import "./Korpa.scss";

function Korpa({ data, id }) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  return (
    <>
      <div className="korpa shadow-sm">
        <div className="cena" style={{ display: "flex" }}>
          <h5>
            {data?.cena.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")} din /{" "}
            {data?.jedmere}
          </h5>
        </div>

        <Quantity
          initialQuantity={quantity}
          onQuantityChange={handleQuantityChange}
        />

        <div className="lager-stanje">
          {data?.nalageru !== 0 ? (
            <>
              <i className="bi bi-check-lg" style={{ color: "green" }} /> Na
              stanju
            </>
          ) : (
            <>
              <i className="bi bi-x-lg" style={{ color: "red" }} /> Nije na
              stanju
            </>
          )}
        </div>

        <AddToCart data={data} id={id} quantity={quantity}>
          <i className="bi bi-basket" /> Dodaj u korpu
        </AddToCart>
      </div>
    </>
  );
}

export default Korpa;
