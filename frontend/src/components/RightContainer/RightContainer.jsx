import Dostava from "../Dostava/Dostava";
import Korpa from "../Korpa/Korpa";

function Rightcontainer({ data, id }) {
  // console.log(data);
  return (
    <div className="right-container">
      <Korpa data={data} id={id} />
      <Dostava />
    </div>
  );
}

export default Rightcontainer;
