import useFetch from "../../../hooks/useFetch";
import Loadersmall from "../../Loader/Loadersmall";
import "./Narudzbine.scss";

function Narudzbine() {
  const apiUrl = import.meta.env.VITE_BASE_API_URL;
  const { data, isLoading, err } = useFetch(`${apiUrl}/orderssadrzaj/`);
  const eur = 117.15;

  if (isLoading) return <Loadersmall />;

  if (err) {
    console.error(err);
    return null;
  }

  if (!data || data.length === 0) return <h1>Nisi ništa zaradio.</h1>;

  const flattenedData = JSON.stringify(data, null, 2);
  // console.log(`Porudzbina: ${flattenedData}`);

  const totalSum = data?.reduce((acc, d) => acc + d.kolicina * d.cena_kom, 0);
  const averageTotalPrice = totalSum / data.length;

  return (
    <div>
      <h5>Prosečna vrednost narudžbine je:</h5>
      <h1>{averageTotalPrice.toFixed(2)} RSD</h1> za {data.length} narudžbina.
      <h4>Obrt: {(totalSum / eur).toFixed(2)} EUR</h4>
    </div>
  );
}

export default Narudzbine;
