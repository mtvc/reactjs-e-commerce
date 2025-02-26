import groupBy from "../../hooks/groupBy";
import useFetch from "../../hooks/useFetch";
import Loadersmall from "../Loader/Loadersmall";
import "./Filters.scss";

function Filters({ searchData, setSearchData }) {
  const apiUrl = import.meta.env.VITE_BASE_API_URL;
  const { data, isLoading, err } = useFetch(`${apiUrl}/grupe`);

  // Group searchData by "sifra_nad_grupe"
  const groupedData = searchData ? groupBy(searchData, "sifra_nad_grupe") : {};
  //   console.log(`groupedData: ${Object.keys(groupedData)}`);
  //   console.log(`searchData: ${JSON.stringify(searchData)}`);

  // Create a map for sifra to naziv
  const sifraToNazivMap =
    data?.reduce((map, grupa) => {
      map[grupa.sifra_grupe] = grupa.naziv;
      return map;
    }, {}) || {};

  // Filter and group nadgrupa
  const nadgrupa = [];
  Object.keys(groupedData).forEach((key) => {
    groupedData[key].forEach((item) => {
      const found = data?.find(
        (grupa) => grupa.sifra_grupe === item.sifra_nad_grupe
      );
      if (found) {
        nadgrupa.push(found);
      }
    });
  });

  // Group nadgrupa by sifra_nadgrupe
  const parentGrup = groupBy(nadgrupa, "sifra_nadgrupe");

  // Render parent groups and their children
  const renderParentGroups = () => {
    return Object.keys(parentGrup).map((key) => {
      const frequencyMap = parentGrup[key].reduce((acc, element) => {
        acc[element.naziv] = (acc[element.naziv] || 0) + 1;
        return acc;
      }, {});

      //   console.log(`frequncyMap: ${Object.keys(frequencyMap)}`);

      //   console.log(`searchFilterArr: ${searchFilterArr}`);
      // Handle click on h6 to set search data

      const handleSetSearchData = (naziv) => {
        const filteredData = searchData.filter(
          (item) => item.naziv === naziv.toString()
        );
        setSearchData(filteredData);
        console.log(
          `searchData: ${JSON.stringify(searchData)} naziv1: ${naziv}`
        );
      };

      return (
        <div className="filter-grupa " key={key}>
          <h6>
            {sifraToNazivMap[key]} ({parentGrup[key].length})
          </h6>

          {/* Iterate through unique child elements */}
          {Object.entries(frequencyMap).map(([naziv, count], index) => (
            <div className="filter-item" key={index}>
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label
                className="form-check-label"
                htmlFor={`flexCheckDefault-${index}`}
              >
                <h7 onClick={() => handleSetSearchData(naziv)}>
                  {naziv} ({count})
                </h7>
              </label>
            </div>
          ))}
        </div>
      );
    });
  };

  //
  //   console.log(`parentGroup: ${JSON.stringify(parentGrup)}`);

  // Render loading, error, or the grouped data items
  if (isLoading) {
    return <Loadersmall />;
  }

  if (err) {
    return <div>Error: {err}</div>;
  }

  return <div className="filteri">{renderParentGroups()}</div>;
}

export default Filters;
