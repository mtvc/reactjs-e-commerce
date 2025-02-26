import { useEffect, useState } from "react";
import axios from "axios";

function useFetch(apiUrlSufix) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(apiUrlSufix);
        setData(response.data);
      } catch (error) {
        setErr(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [apiUrlSufix]);

  return { data, isLoading, err };
}

export default useFetch;
