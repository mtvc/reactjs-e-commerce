import { useNavigate, useSearchParams } from "react-router-dom";
import "./Search.scss";

function Search({ searching, setSearching }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams({ q: "" });

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.searchInput.value;
    setSearching(searchValue);
    setSearchParams({ q: searchValue });
    navigate(`/pretraga?q=${searchValue}`);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        className="form-control shadow-none"
        type="search"
        placeholder="Pretraga proizvoda..."
        aria-label="Search"
        id="search-bar"
        name="searchInput"
        autoFocus="autofocus"
      />
      <button className="btn btn-danger" type="submit">
        <i className="bi bi-search" style={{ color: "white" }}></i> Pretraži
      </button>
    </form>
  );
}

export default Search;
