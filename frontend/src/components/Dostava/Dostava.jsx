import "./Dostava.scss";

function Dostava() {
  return (
    <div className="dostava">
      <div className="dostava-item">
        <i className="bi bi-truck dostava-icon"></i>
        <span>Dostava u roku od 1 - 3 radna dana.</span>
      </div>
      <div className="dostava-item">
        <i className="bi bi-credit-card-2-back dostava-icon"></i>
        <span>Plaćanje kod kurira gotovinom ili karticom.</span>
      </div>
      <div className="dostava-item">
        <i className="bi bi-piggy-bank dostava-icon"></i>
        <span>Besplatna dostava za narudžbine preko 7000 Din.</span>
      </div>
    </div>
  );
}

export default Dostava;
