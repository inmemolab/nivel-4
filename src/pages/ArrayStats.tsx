import React, { useState, useEffect } from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const ArrayStats = () => {
  // axios
  const apiClient = axios.create({
    baseURL: "https://keo-test-3.herokuapp.com",
    headers: {
      "Content-type": "application/json",
    },
  });
  // useState
  const [arrayList, setArrayList] = useState<
    { total: any; count: any; ratio: any; result: any }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [value, setValue] = useState("");
  // traemos la data
  const fetchData = (id: any) => {
    apiClient
      .get("/api/stats", { params: { isnumber: id } })
      .then((response) => {
        setIsLoading(false);
        setArrayList((data) => [
          ...data,
          {
            total: response.data.total,
            count: response.data.count,
            ratio: response.data.ratio,
            result: response.data.result,
          },
        ]);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
      });
  };
  //
  function handle() {
    fetchData(value);
  }
  // useEffect
  useEffect(() => {
    // fetchData(5);
  }, []);
  // si es loading
  if (isLoading) {
    return <div>Loading...</div>;
  }
  // return
  return (
    <div>
      <h1>Stat</h1>
      <div>
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <button onClick={handle}>Buscar</button>
      </div>
      {arrayList.map(({ total, count, ratio, result }) => (
        <>
          <div>
            <h3>Total:</h3> {total}
          </div>
          <div>
            <h3>Count:</h3> {count}
          </div>
          <div>
            <h3>Ratio:</h3> {ratio}
          </div>

          <Row>
            <div>
              <h3>Resultado:</h3> <pre>{JSON.stringify(result, null, 2)}</pre>
            </div>
          </Row>
        </>
      ))}
      {isError && <div>Error fetching data.</div>}
    </div>
  );
};
export default ArrayStats;
