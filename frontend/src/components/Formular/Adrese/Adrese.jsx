import "./Adrese.scss";

function Adrese({ broj, setNovaAdresa, novaAdresa }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedAdresses = novaAdresa.map((adresa, index) => {
      if (index === broj) {
        return { ...adresa, [name]: value };
      }
      return adresa;
    });
    setNovaAdresa(updatedAdresses);
  };

  const handleRemoveAdress = () => {
    // Prevent deletion if it's the only address
    if (novaAdresa.length === 1) {
      return;
    }
    // Remove the address at the specified index
    const filteredAdresses = novaAdresa.filter((_, index) => index !== broj);
    setNovaAdresa(filteredAdresses);
  };

  // Determine if the delete icon should be disabled
  const isDisabled = novaAdresa.length === 1;

  return (
    <div id={`adresa-${broj}`} className="grupa row adresa-wrap">
      <div className="col-md-4">
        <label htmlFor={`inputAdresa${broj}`} className="form-label">
          {broj === 0 ? "Adresa*" : `Adresa ${broj + 1}*`}
        </label>
        <input
          type="text"
          className="form-control"
          id={`inputAdresa${broj}`}
          name="adresa"
          placeholder={broj === 0 ? "Adresa" : `Adresa ${broj + 1}`}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-1">
        <label htmlFor={`inputAdressNumber${broj}`} className="form-label">
          Broj*
        </label>
        <input
          type="text"
          className="form-control"
          id={`inputAdressNumber${broj}`}
          name="broj"
          placeholder="Broj"
          onChange={handleChange}
        />
      </div>
      <div className="col-md-2">
        <label htmlFor="inputDrzava" className="form-label">
          Država*
        </label>
        <select
          id="inputDrzava"
          className="form-select"
          name="drzava"
          onChange={handleChange}
          defaultValue="Srbija"
        >
          <option value="Srbija">Srbija</option>
        </select>
      </div>
      <div className="col-md-2">
        <label htmlFor={`inputMesto${broj}`} className="form-label">
          Mesto*
        </label>
        <input
          type="text"
          className="form-control"
          id={`inputMesto${broj}`}
          name="mesto"
          onChange={handleChange}
        />
      </div>
      <div className="col-md-2">
        <label htmlFor={`inputPostanskiBroj${broj}`} className="form-label">
          Poštanski Broj*
        </label>
        <input
          type="number"
          className="form-control"
          id={`inputPostanskiBroj${broj}`}
          name="postanskiBroj"
          onChange={handleChange}
        />
      </div>
      <div className="col-md-1 obrisi-adresu">
        <i
          id={broj}
          className={`delAdress bi bi-trash3-fill ${
            isDisabled ? "disabled" : ""
          }`}
          onClick={isDisabled ? null : handleRemoveAdress}
        ></i>
      </div>
    </div>
  );
}

export default Adrese;
