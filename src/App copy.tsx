import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import "./App.css";

import ArrayData from "./types/ArrayData";
import DataService from "./services/ManageData";

// function App() {
const App: React.FC = () => {
  // useStates App
  const [getResult, setGetResult] = useState<string | null>(null);
  const [count, setCount] = useState(0);
  // formateo del response
  const fortmatResponse = (res: any) => {
    return JSON.stringify(res, null, 2);
  };
  // call get data
  function getAllData() {
    try {
      getArrys();
    } catch (err) {
      setGetResult(fortmatResponse(err));
    }
  }
  // query
  const { isLoading: isLoadingArray, refetch: getArrys } = useQuery<
    ArrayData[],
    Error
  >(
    "query-array",
    async () => {
      return await DataService.fechAll();
    },
    {
      enabled: false,
      onSuccess: (res) => {
        setGetResult(fortmatResponse(res));
      },
      onError: (err: any) => {
        setGetResult(fortmatResponse(err.response?.data || err));
      },
    }
  );
  // useEfFect
  useEffect(() => {
    if (isLoadingArray) setGetResult("loading...");
  }, [isLoadingArray]);

  return (
    <div className="App">
      <header className="App-header">
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          <button className="btn btn-sm btn-primary" onClick={getAllData}>
            Get All
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
      {getResult && (
        <div className="alert alert-secondary mt-2" role="alert">
          <pre>{getResult}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
