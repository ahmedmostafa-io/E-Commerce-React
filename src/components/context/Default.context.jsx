import { createContext, useState } from "react";

export const DefaultContext = createContext();
export default function DefaultFetchContext({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <DefaultContext.Provider
      value={{ isLoading, setIsLoading, error, setError }}
    >
      {children}
    </DefaultContext.Provider>
  );
}
