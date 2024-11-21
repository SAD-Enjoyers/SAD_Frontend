import { useState } from "react";

const useFetchWithLoader = (url, options) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async (bodyData = null) => {
    setIsLoading(true); // شروع لودینگ
    setError(null); // ریست خطا

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "x-role": localStorage.getItem("role"), // اضافه کردن role
          "Content-Type": "application/json",
        },
        // body: bodyData ? JSON.stringify(bodyData) : null,
      });
      // status code between 200 to 300
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false); // پایان لودینگ
    }
  };

  return { isLoading, data, error, fetchData };
};

export default useFetchWithLoader;
