import { useState } from "react";

const useFetchWithLoader = async (url, options) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  setIsLoading(true);
  // setIsValid(true); // Reset valid state to true before fetching

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "x-role": localStorage.getItem("role"),
        "Content-Type": "application/json",
      },
      body: bodyData ? JSON.stringify(bodyData) : null,
    });

    console.log(response.status);
    if (!response.ok) {
    }
  } catch (err) {
    // pass
  }
  return { isLoading, data };
};

export default useFetchWithLoader;
