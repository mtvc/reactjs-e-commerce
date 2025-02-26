import { useEffect, useState } from "react";

function useSortBy(dataSource) {
  const [dataArr, setDataArr] = useState([]);
  const [order, setOrder] = useState("ASC");

  // console.log(dataArr);

  useEffect(() => {
    if (dataSource && dataSource.length > 0) {
      setDataArr(dataSource);
    }
  }, [dataSource]);

  const sorting = (col) => {
    const sorted = [...dataArr].sort((a, b) =>
      order === "ASC" ? (a[col] > b[col] ? 1 : -1) : a[col] < b[col] ? 1 : -1
    );

    setDataArr(sorted);
    setOrder(order === "ASC" ? "DSC" : "ASC");
  };

  return { dataArr, sorting, setDataArr };
}

export default useSortBy;
