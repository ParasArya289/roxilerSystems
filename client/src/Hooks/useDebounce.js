import { useEffect, useState } from "react";

const useDebounce = (string, frequency) => {
  const [debouncedString, setDebouncedString] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedString(string), frequency);
    return () => clearInterval(timer);
  }, [string]);
  return debouncedString;
};

export default useDebounce;
