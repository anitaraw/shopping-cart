import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import { Search } from "semantic-ui-react";
import { currencyFormatter } from "../util";
import "./SearchProducts.css";
import { searchProducts } from "../CartAPI";

function SearchProducts(props) {
  const { updateProductList, viewCart } = props;
  const [results, setResults] = useState([]);
  const [value, setValue] = useState();

  const timeoutRef = useRef();

  useEffect(() =>{
    if(viewCart){
      setValue('')
    }
  }, [viewCart]);

  const getSearchResults = async (searchKey) => {
    const response = await searchProducts(searchKey);
    const displayResultList = response.map((item) => {
      return {
        ...item,
        price: currencyFormatter.format(item.price),
      };
    });
    setResults(displayResultList);
    updateProductList(response);
  };

  const handleSearchChange = (e, data) => {
    clearTimeout(timeoutRef.current);
    setValue(data.value);
    getSearchResults(data.value);
  };

  const onResultSelect = (data) => {
    console.log(data);
    setValue(data.result.title);
  };

  return (
    <Search
      placeholder="Search..."
      onResultSelect={(e, data) => onResultSelect(data)}
      onSearchChange={handleSearchChange}
      results={results}
      value={value}
    />
  );
}

export default SearchProducts;
