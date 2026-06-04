import { useEffect, useState } from "react";

function useFetch(fetchFunction, dependencies = []) {
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);

        const response = await fetchFunction();

        setData(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, dependencies);

  return {
    data,
    loading,
    error,
  };
}

export default useFetch;