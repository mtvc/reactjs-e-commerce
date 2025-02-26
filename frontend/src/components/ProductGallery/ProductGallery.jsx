import { useState } from "react";
import "./ProductGallery.scss";
import useFetch from "../../hooks/useFetch";
import groupBy from "../../hooks/groupBy";
import Loadersmall from "../Loader/Loadersmall";

function ProductGallery({ id }) {
  const apiUrl = import.meta.env.VITE_BASE_API_URL;
  const siteUrl = import.meta.env.VITE_BASE_SITE_URL;

  const { data, isLoading, err } = useFetch(`${apiUrl}/artikalslike`);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const handleImageClick = (index) => {
    setMainImageIndex(index);
  };

  if (isLoading) return <Loadersmall />;
  if (err) {
    console.error(err);
    return null;
  }

  const slikeMap = groupBy(data, "sifra");

  // Check if the group with the provided ID exists
  if (slikeMap && id in slikeMap) {
    // If it exists, access the group with the provided ID
    const selectedGroup = slikeMap[id];

    return (
      <div className="product-image-galery">
        <div className="main-image">
          <img
            src={`${siteUrl}/${selectedGroup[mainImageIndex].putanja}`}
            alt={`Image-${selectedGroup[mainImageIndex].redni_broj}`}
          />
        </div>
        <ul className={selectedGroup.length > 1 ? "" : "hide"}>
          {selectedGroup.map(
            (image, i) =>
              selectedGroup.length > 1 && (
                <li
                  key={i}
                  className="image-galery"
                  onClick={() => handleImageClick(i)}
                >
                  <img
                    src={`${siteUrl}/${image.putanja}`}
                    alt={`Image-${image.redni_broj}`}
                  />
                </li>
              )
          )}
        </ul>
      </div>
    );
  } else {
    return <p>Slika nije pronađena za {id} proizvod.</p>;
  }
}

export default ProductGallery;
