import "./App.css";
import { useEffect, useState } from "react";
import {getAuthToken, getSearchResultsData } from "./api/api";
import { API_ENDPOINTS } from "./utils/consts";

function App() {
  const [stocks, setStocks] = useState([]);
  const [authToken, setAuthToken] = useState("");
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    getAuth();
  }, []);

  const getAuth = async () => {
    let authFromLocalStorage = localStorage.getItem('user-access-token');
    if (authFromLocalStorage) {
      setAuthToken(authFromLocalStorage);
    } else {
      let token = await getAuthToken(API_ENDPOINTS.getAuth);
      setAuthToken(token);
    }
  };

  const getSearchResults = async (e) => {
    e.preventDefault();
    if (authToken) {
      let data = await getSearchResultsData(
        {
          "user-access-token": authToken,
        },
        searchString
      );
      if (data) setStocks(data);
      else setStocks([]);
    } else {
      console.log("ERROR: AUTH TOKEN NOT PRESENT");
    }
  };

  return (
    <div className="App">
      <form onSubmit={getSearchResults}>
        <input
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        {stocks.length ? <table>
          <thead>
            <tr>
              <th>NAME</th>
              <th>High</th>
              <th>Low</th>
            </tr>
          </thead>
          <tbody>
            {stocks?.map((stock, idx) => (
              <tr key={stock[0] + idx}>
                <td>{stock[0]}</td>
                <td>{stock[1]}</td>
                <td>{stock[2]}</td>
              </tr>
            ))}
          </tbody>
        </table> : (
            <div>No data to display. Please search for a valid stock.</div>
        )}
      </div>
    </div>
  );
}

export default App;
