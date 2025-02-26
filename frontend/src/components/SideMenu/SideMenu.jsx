import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";
import { Link, useParams } from "react-router-dom";
import "./SideMenu.scss";

function SideMenu({ setShowMobilMeni }) {
  const apiUrl = import.meta.env.VITE_BASE_API_URL;
  const { sgr, id } = useParams();
  // console.log(`iz menija -> sifra grupe: ${sgr} sifra artikla: ${id}`);

  const { data, isLoading, err } = useFetch(`${apiUrl}/grupe`);

  const [menuData, setMenuData] = useState([]);
  const [isExpanded, setIsExpanded] = useState({});
  const [activeItemId, setActiveItemId] = useState(null); // Track active item ID

  // console.log(id);

  // Process menu data when data changes
  useEffect(() => {
    if (data) {
      const processedMenuData = processMenuData(data);
      setMenuData(processedMenuData);
      // Initialize isExpanded state for level 1 items to be expanded by default
      const level1Items = processedMenuData.filter((item) => item.level === 1);
      const initialExpandedState = {};
      level1Items.forEach((item) => {
        initialExpandedState[item.sifra_grupe] = true;
      });
      setIsExpanded(initialExpandedState);
    }
  }, [data]);

  // Function to process menu data
  const processMenuData = (data) => {
    // Group data by parent ID
    const menuMap = new Map();
    data.forEach((item) => {
      const parentId = item.sifra_nadgrupe || null;
      if (!menuMap.has(parentId)) {
        menuMap.set(parentId, []);
      }
      menuMap.get(parentId).push(item);
    });

    // console.log(menuMap); // GRUPISANJE PO NADGRUPI

    // Sort and filter menu items
    const sortedMenuData = [];
    const processGroup = (parentId, level) => {
      const items = menuMap.get(parentId) || [];
      items
        .filter((item) => item.hidden !== 1)
        .sort((a, b) => a.podnivo - b.podnivo)
        .forEach((item) => {
          sortedMenuData.push({ ...item, level });
          processGroup(item.sifra_grupe, level + 1);
        });
    };
    processGroup(null, 1);

    // console.log(sortedMenuData); // MENI PO NIVOIMA

    return sortedMenuData;
  };

  // Toggle menu item visibility
  const toggleMenu = (itemId, itemLevel) => {
    // Check if the item is already active
    if (activeItemId === itemId && activeItemId.hasChildren) {
      return; // Prevent toggling if the same item is clicked again
    }

    // Check if the item is in level 1, if so, don't collapse any other items
    if (itemLevel === 1) {
      setIsExpanded({
        ...isExpanded,
        [itemId]: !isExpanded[itemId],
      });
      setActiveItemId(itemId); // Update active item ID

      return;
    }

    if (id === itemId) {
      setIsExpanded({
        ...isExpanded,
        [itemId]: !isExpanded[itemId],
      });
      setActiveItemId(itemId); // Update active item ID

      return;
    }
    // PROVERAVA DA LI JE MENI U NEKOM OD DIVOVA KOJI IMA KLASU MOBIL-MENI
    let isMobilMeni = false;
    let targetElement = event.target;
    while (targetElement) {
      if (targetElement.classList.contains("mobil-meni")) {
        isMobilMeni = true;
        break;
      }
      targetElement = targetElement.parentElement;
    }
    if (isMobilMeni) {
      // Check if the item has children
      const hasChildren = menuData.some(
        (item) => item.sifra_nadgrupe === itemId
      );

      // Close the mobile menu if the clicked element has no children
      if (!hasChildren) {
        setShowMobilMeni(false);
      }
    }

    // Collapse other items at the same level
    const updatedExpandedState = { ...isExpanded };
    menuData.forEach((item) => {
      if (item.level === itemLevel && item.sifra_grupe !== itemId) {
        updatedExpandedState[item.sifra_grupe] = false;
      }
    });

    // console.log(`updated: ${{ updatedExpandedState }}`); //NISAM TAČNO SIGURAN ŠTA RADI

    // Toggle visibility of selected item
    setIsExpanded({
      ...updatedExpandedState,
      [itemId]: !isExpanded[itemId],
    });

    // Update active item ID

    setActiveItemId(itemId);
    console.log(`itemId:${itemId} ID: ${id}`);
  };

  // Render individual menu item
  const renderMenuItem = (item, level) => {
    const isActive =
      isExpanded[item.sifra_grupe] &&
      level !== 1 &&
      activeItemId === item.sifra_grupe;

    return (
      <div
        onClick={() => toggleMenu(item.sifra_grupe, item.level)}
        className={isActive ? "active" : ""}
      >
        {level !== 1 ? (
          <Link to={`/${item.sifra_grupe}`}>{item.naziv}</Link>
        ) : (
          <>
            <span className="top-nivo">{item.naziv}</span>
            <hr />
          </>
        )}
      </div>
    );
  };

  // Render menu items recursively
  const renderMenu = (items, level, hasChildren) => (
    <ul>
      {items.map((item) => (
        <li
          key={item.sifra_grupe}
          id={item.sifra_grupe}
          className={item.sifra_grupe === id ? "active" : ""}
        >
          {renderMenuItem(item, level)}
          {isExpanded[item.sifra_grupe] &&
            item.level < 5 &&
            renderMenu(
              menuData.filter((i) => i.sifra_nadgrupe === item.sifra_grupe),
              level + 1
            )}
        </li>
      ))}
    </ul>
  );

  // Render the component
  if (isLoading) return <Loader />;
  if (err) {
    console.error(err);
    return <div>Greška pri učitavanju 💥.</div>;
  }
  if (!menuData.length) return null;

  return (
    <div className="menu-side ">
      {renderMenu(
        menuData.filter((item) => !item.sifra_nadgrupe),
        1
      )}
    </div>
  );
}

export default SideMenu;
