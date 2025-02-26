import { useEffect, useState } from "react"; // Import React and useState hook
import "./Quantity.scss";
import { updateQuantity } from "../../redux/cartReducer";

function Quantity({ initialQuantity, onQuantityChange }) {
  const [quantity, setQuantity] = useState(initialQuantity || 1);

  // Handler function to decrease quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Handler function to increase quantity
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  // updateQuantity();
  // Handler function for input change
  const handleInputChange = (event) => {
    event.preventDefault();
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity)) {
      setQuantity(newQuantity);
    }
  };

  // Call the onQuantityChange callback whenever quantity changes
  useEffect(() => {
    onQuantityChange(quantity);
  }, [quantity]);

  return (
    <div className="qtyDiv">
      <button className="qty" onClick={decreaseQuantity}>
        -
      </button>
      <input
        className="qtyInput"
        size="1"
        value={quantity}
        onChange={handleInputChange}
      />
      <button className="qty" onClick={increaseQuantity}>
        +
      </button>
    </div>
  );
}

export default Quantity;
