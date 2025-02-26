import "./UpdateProizvoda.scss";

function UpdateProizvoda() {
  return (
    <>
      <div className="update-proiz">
        <h5>Update proizvoda:</h5>
        <input type="file" id="update-proizvoda" name="update" accept=".csv" />
        <button className="btn btn-warning">
          <i className="bi bi-file-earmark-arrow-up"></i> Ažuriraj proizvode
        </button>
      </div>
      <br />
      <br />
      <div className="update-proiz">
        <h5>Update cena:</h5>
        <input type="file" id="update-cena" name="update" accept=".csv" />
        <button className="btn btn-warning">
          <i className="bi bi-file-earmark-arrow-up"></i> Ažuriraj cene
        </button>
      </div>
    </>
  );
}

export default UpdateProizvoda;
