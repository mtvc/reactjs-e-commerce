import Groups from "../../components/Groups/Groups";
import SideMenu from "../../components/SideMenu/SideMenu";

function GrupeProizvoda() {
  return (
    <>
      <body>
        <section id="side-bar-section">
          <SideMenu />
        </section>
        <main id="content-section">
          <Groups />
        </main>
        <footer>
          <p>Kanibal 2024</p>
        </footer>
      </body>
    </>
  );
}

export default GrupeProizvoda;
