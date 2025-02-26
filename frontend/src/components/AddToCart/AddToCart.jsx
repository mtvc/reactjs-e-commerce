import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";
import "./AddToCart.scss";

function AddToCart({ data, id, quantity, children }) {
  const dispatch = useDispatch();
  const siteUrl = import.meta.env.VITE_BASE_SITE_URL;
  return (
    <button
      className="btn btn-danger"
      onClick={() =>
        dispatch(
          addToCart({
            id,
            title: data.naziv,
            desc: data.naziv_veliki,
            img: `${siteUrl}/${data.slikaM || "bez_slikeM.png"}`,
            price: data.cena,
            quantity,
          }),
          toast.success("Proizvod je dodat u korpu.")
        )
      }
    >
      <span>{children}</span>
    </button>
  );
}

export default AddToCart;
