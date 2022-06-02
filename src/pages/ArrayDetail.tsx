import React, { useState, useEffect } from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const ArrayDetail = (props: { match: { params: { id: any } } }) => {
  // axios
  const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      "Content-type": "application/json",
    },
  });
  // useState
  const [arrayList, setArrayList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  // traemos la data
  const fetchData = (id: any) => {
    apiClient
      .get(`/api/item/${id}`)
      .then((response) => {
        setIsLoading(false);
        setArrayList(response.data.result);
        console.log(response.data.result);
        console.log(arrayList);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        console.log(error);
      });
  };
  // useEffect
  useEffect(() => {
    fetchData(props.match.params.id);
  }, [props.match.params.id]);
  // si es loading
  if (isLoading) {
    return <div>Loading...</div>;
  }
  // return
  return (
    <div>
      <h1>Detalle</h1>
      {arrayList.map(({ id, min, max, numbers, minNum, missing }) => (
        <>
          <div>
            <h3>id:</h3> {id}
          </div>
          <div>
            <h3>Min:</h3> {min}
          </div>
          <div>
            <h3>Max:</h3> {max}
          </div>
          <div>
            <h3>Menor numero:</h3> <h4>{minNum}</h4>
          </div>

          <Row>
            <Col>
              <div>
                <h3>Numero que se enviaron:</h3>{" "}
                <pre>{JSON.stringify(numbers, null, 2)}</pre>
              </div>
            </Col>
            <Col>
              <div>
                <h3>Numero que faltaron:</h3>{" "}
                <pre>{JSON.stringify(missing, null, 2)}</pre>
              </div>
            </Col>
          </Row>
        </>
      ))}
      {isError && <div>Error fetching data.</div>}
    </div>
  );
};
export default ArrayDetail;
