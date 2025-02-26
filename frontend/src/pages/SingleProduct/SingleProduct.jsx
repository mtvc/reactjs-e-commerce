import { useEffect } from "react";
import Artikal from "../../components/Artikal/Artikal";
import SideMenu from "../../components/SideMenu/SideMenu";

function SingleProduct({ setShowSearch }) {
  useEffect(() => {
    setShowSearch(false);
  }, []);

  return (
    <>
      <section id="side-bar-section">
        <SideMenu />
      </section>
      <main id="content-section">
        <Artikal />
      </main>
      <footer>
        <p>Kanibal 2024</p>
      </footer>
    </>
  );
}

export default SingleProduct;
