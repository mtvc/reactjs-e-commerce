import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "../../redux/cartReducer";
import toast from "react-hot-toast";
import Quantity from "../../components/Quantity/Quantity";
import { useEffect, useState } from "react";
// import sendOrder from "../../hooks/sendOrder";
import Modal from "../../components/Modal/Modal";
import LogIn from "../../components/LogIn/LogIn";
import { useNavigate } from "react-router-dom";
import "./Kasa.scss";

function Kasa() {
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  const [proizvodi, setProizvodi] = useState([]); // Initialize proizvodi as an empty array
  const [openModal, setOpenModal] = useState(false);
  const [openModalLogin, setOpenModalLogin] = useState(false);

  useEffect(() => {
    // Merge products with the same id into one item
    const mergedProducts = products.reduce((acc, curr) => {
      const existingProduct = acc.find((item) => item.id === curr.id);
      if (existingProduct) {
        existingProduct.quantity += curr.quantity; // Sum quantities
      } else {
        acc.push({ ...curr }); // Add new product
      }
      return acc;
    }, []);
    setProizvodi(mergedProducts);
  }, [products]);

  //Zbir cena
  const calculateTotalPrice = () => {
    return proizvodi.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  };

  const handleQuantityChange = (id, newQuantity) => {
    const updatedProizvodi = proizvodi.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: newQuantity }; // Update quantity for the item with matching id
      }
      return item;
    });
    setProizvodi(updatedProizvodi); // Update proizvodi array with new quantity
    dispatch(updateQuantity(id, newQuantity)); // Dispatch action to update quantity in Redux store
  };

  const handleLogin = () => {
    setOpenModalLogin(!openModalLogin), setOpenModal(false);
  };

  const navigate = useNavigate();

  const goToNavigate = () => {
    navigate("/createaccount", { replace: true });
  };

  console.log(proizvodi);

  return (
    <div className="kasa-container">
      {proizvodi.length === 0 ? (
        <h2>Vaša korpa je prazna.</h2>
      ) : (
        <>
          <h2>
            Vaša korpa sadrži {proizvodi.length}{" "}
            {proizvodi.length === 1 ? "proizvod" : "proizvoda"}.
          </h2>
          <br />
          <div className="cart">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Slika</th>
                  <th scope="col">Šifra</th>
                  <th scope="col">Naziv</th>
                  {/* <th scope="col">Odmah dostupno</th> */}
                  <th scope="col">Dostupno odmah</th>
                  <th scope="col">Količina</th>
                  <th scope="col">Cena</th>
                  <th scope="col">Ukupno</th>
                  <th scope="col">Izbaci</th>
                </tr>
              </thead>
              <tbody>
                {proizvodi.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img src={item.img} alt={item.title} />
                    </td>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>
                      {item.nalageru === 0 ? (
                        <i className="bi bi-x-lg" style={{ color: "red" }} />
                      ) : (
                        <i
                          className="bi bi-check-lg"
                          style={{ color: "green" }}
                        />
                      )}
                    </td>
                    <td>
                      <Quantity
                        initialQuantity={item.quantity}
                        onQuantityChange={(newQuantity) =>
                          handleQuantityChange(item.id, newQuantity)
                        }
                      />
                    </td>
                    <td>{item.price} din</td>
                    <td>{item.price * item.quantity} din</td>
                    <td
                      onClick={() => {
                        dispatch(removeItem(item.id));
                        toast.error("Proizvod je izbačen iz korpe.");
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <i className="bi bi-trash3-fill"></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="total-cena">
              <div className="cena-kasa">
                <h5>
                  pdv: {((calculateTotalPrice() / 100) * 20).toFixed(2)} Din.
                </h5>
                <h4>{calculateTotalPrice()} Din.</h4>
              </div>
              <div className="poruci-buton">
                <button
                  className="btn btn-success"
                  onClick={() => setOpenModal(!openModal)}
                >
                  Naruči {proizvodi.length === 1 ? "proizvod" : "proizvode"}
                </button>
              </div>
            </div>
            <br />
            <br />
          </div>

          <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleLogin}
            >
              Prijavi se
            </button>
            <button
              type="button"
              className="btn btn-warning"
              onClick={goToNavigate}
            >
              Registruj se
            </button>
          </Modal>
          <Modal
            isOpen={openModalLogin}
            onClose={() => setOpenModalLogin(false)}
          >
            <LogIn />
          </Modal>
        </>
      )}
    </div>
  );
}

export default Kasa;
