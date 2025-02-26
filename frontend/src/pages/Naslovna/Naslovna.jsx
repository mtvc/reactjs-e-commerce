// import GrupeProizvodaHome from "../GrupeProizvodaHome/GrupeProizvodaHome";
import { useRef } from "react";
import GrupeProizvodaHome from "../../components/GrupeProizvodaHome/GrupeProizvodaHome";
import "./Naslovna.scss";

function Naslovna() {
  const kabloviRef = useRef(null);
  const konektoriRef = useRef(null);
  const terminisaniRef = useRef(null);
  const opremaRef = useRef(null);

  const handleScroll = (ref, event) => {
    const container = ref.current;
    if (container) {
      // event.preventdefault();
      const delta = Math.max(-1, Math.min(1, event.deltaY));
      container.scrollLeft += delta * 50; // Adjust the scroll speed as needed
    }
  };
  return (
    <div className="home-container">
      <h2 className="naslov-grupe-home">Terminisani kablovi</h2>
      <div
        className="terminisani-kablovi-home"
        onWheel={(e) => handleScroll(terminisaniRef, e)}
        ref={terminisaniRef}
      >
        <GrupeProizvodaHome grupaId={14000000} />
      </div>
      <h2 className="naslov-grupe-home">Kablovi na metar</h2>
      <div
        className="kablovi-home"
        onWheel={(e) => handleScroll(kabloviRef, e)}
        ref={kabloviRef}
      >
        <GrupeProizvodaHome grupaId={15000000} />
      </div>
      <h2 className="naslov-grupe-home">Konektori</h2>
      <div
        className="konektori-home"
        onWheel={(e) => handleScroll(konektoriRef, e)}
        ref={konektoriRef}
      >
        <GrupeProizvodaHome grupaId={12000000} />
      </div>
      <h2 className="naslov-grupe-home">Aktivna i pasivna oprema</h2>
      <div
        className="konektori-home"
        onWheel={(e) => handleScroll(opremaRef, e)}
        ref={opremaRef}
      >
        <GrupeProizvodaHome grupaId={18000000} />
      </div>
    </div>
  );
}

export default Naslovna;
