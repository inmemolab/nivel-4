import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ArrayList = () => {
  // Axios
  const apiClient = axios.create({
    baseURL: "https://keo-test-3.herokuapp.com",
    headers: {
      "Content-type": "application/json",
    },
  });
  // useState
  const [arrayList, setArrayList] = useState<any[]>([]);
  const [favList, setFavList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  // traemos la data
  const fetchData = () => {
    apiClient
      .get("/api/all")
      .then((response) => {
        setIsLoading(false);
        setArrayList(response.data.result);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
      });
  };
  // useEffect
  useEffect(() => {
    fetchData();
  }, []);
  // si es loading
  if (isLoading) {
    return <div>Loading...</div>;
  }
  // agregamos a favoritos
  const addToFavorite = (id: any) => {
    var result = arrayList.find((obj) => {
      return obj.id === id;
    });
    setFavList((state) => [...state, result]);
  };
  // return
  return (
    <div>
      <h1>Listado</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">min</th>
            <th scope="col">max</th>
            <th scope="col">minNum</th>
            <th scope="col">Aciones</th>
          </tr>
        </thead>
        <tbody>
          {arrayList.map(({ id, min, max, minNum }) => (
            <tr key={id}>
              <th scope="row">{id}</th>
              <td>{min}</td>
              <td>{max}</td>
              <td>{minNum}</td>
              <td>
                <ul>
                  <li>
                    <Link to={"/array-detail/" + id}>Ver</Link>
                  </li>
                  <li>
                    <button
                      onClick={() => addToFavorite(id)}
                      className="button"
                      name="button 2"
                    >
                      favoritos
                    </button>
                  </li>
                </ul>
              </td>
            </tr>
          ))}
          {isError && <div>Error fetching data.</div>}
        </tbody>
      </table>
      <h1>Favoritos</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">min</th>
            <th scope="col">max</th>
            <th scope="col">minNum</th>
            <th scope="col">Aciones</th>
          </tr>
        </thead>
        <tbody>
          {favList.map(({ id, min, max, minNum }) => (
            <tr key={id}>
              <th scope="row">{id}</th>
              <td>{min}</td>
              <td>{max}</td>
              <td>{minNum}</td>
              <td>
                <ul>
                  <li>
                    <Link to={"/array-detail/" + id}>Ver</Link>
                  </li>
                </ul>
              </td>
            </tr>
          ))}
          {isError && <div>Error fetching data.</div>}
        </tbody>
      </table>
    </div>
  );
};
// export
export default ArrayList;
