import { useEffect, useState } from "react";
import Filters from "../../components/Filters/Filters";
import SearchResults from "../../components/SearchResults/SearchResults";
import SideMenu from "../../components/SideMenu/SideMenu";
import { useParams } from "react-router-dom";
import "./Pretraga.scss";

function Pretraga({ searching, searchData, isLoading, err }) {
  const [rezPret, setRezPret] = useState(searchData);

  const { q } = useParams();
  console.log(`q: ${q}`);

  useEffect(() => {
    setRezPret(searchData);
  }, [searching, searchData]);

  return (
    <>
      <body>
        <section id="side-bar-section">
          <SideMenu />
        </section>
        <main id="content-section" className="search-results">
          {searchData < 1 || searching.length === 1 ? (
            ""
          ) : (
            <Filters searchData={rezPret} setSearchData={setRezPret} />
          )}
          <SearchResults
            searching={searching}
            searchData={rezPret}
            isLoading={isLoading}
            err={err}
          />
        </main>
        <section className=""></section>
        <footer>
          <p>Kanibal 2024</p>
        </footer>
      </body>
    </>
  );
}

export default Pretraga;
