import GrupeDash from "../../components/Dashboard/GrupeDash/GrupeDash";
import Narudzbine from "../../components/Dashboard/Narudzbine/Narudzbine";
import Porucilac from "../../components/Dashboard/Porucilac/Porucilac";
import Proizvodi from "../../components/Dashboard/Proizvodi/Proizvodi";
import UpdateProizvoda from "../../components/Dashboard/UpdateProizvoda/UpdateProizvoda";
import Obavestenja from "../../components/Obavestenja/Obavestenja";

import "./Dashboard.scss";

function Dashboard() {
  return (
    <>
      <div className="dashboard row">
        <div className="col-6">
          <div className="dash-section shadow-sm">
            <Proizvodi />
          </div>
        </div>

        <div className="col-6">
          <div className="dash-section shadow-sm">
            <GrupeDash />
          </div>
        </div>
        <div className="col-2">
          <div className="dash-section shadow-sm">
            <UpdateProizvoda />
          </div>
        </div>
        <div className="col-3">
          <div className="dash-section shadow-sm">
            <Obavestenja />
          </div>
        </div>
        <div className="col-3">
          <div className="dash-section shadow-sm"></div>
        </div>
        <div className="col-4">
          <div className="dash-section shadow-sm">{/* <Porucilac /> */}</div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
