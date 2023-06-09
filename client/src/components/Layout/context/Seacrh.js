import { useEffect, useContext, createContext, useState } from "react";

const SearchContext = createContext(); //create context

const SearchProvider = ({ children }) => {
  const [values, setvalues] = useState({
    keyword: "",
    results: [],
  });

  //default axios auth

  return (
    <SearchContext.Provider value={[values, setvalues]}>
      {children}
    </SearchContext.Provider>
  );
};

//custom hook
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
