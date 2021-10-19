import React, { useState, useEffect } from "react";
import { gql, useApolloClient } from "@apollo/client";
import DisplayData from "./DisplayData";

import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

// set query
const CITY_QUERY = gql`
  query ($cityName: String!) {
    getCityByName(name: $cityName, config: { units: metric, lang: en }) {
      name
      country
      weather {
        summary {
          title
          description
          icon
        }
        temperature {
          actual
          feelsLike
          min
          max
        }
        wind {
          speed
          deg
        }
        clouds {
          all
          visibility
          humidity
        }
        timestamp
      }
    }
  }
`;

const App = () => {
  const [cityName, setCityName] = useState("");
  const [emptyCityNameError, setEmptyCityNameError] = useState(false);

  // Used in API calls
  const [fetchedData, setFetchedData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  // Get previous user input from local storage
  const [localStorageData, setLocalStorageData] = useState(() => {
    const localStorageData = localStorage.getItem("localStorageData");
    return localStorageData === null ? null : JSON.parse(localStorageData);
  });

  // Used in making API calls
  const client = useApolloClient();

  useEffect(() => {
    if (fetchedData && fetchedData.getCityByName) {
      localStorage.setItem("localStorageData", JSON.stringify(fetchedData));
      setLocalStorageData(fetchedData);
    }
  }, [fetchedData]);

  // When user type a city name
  const changeCityName = (name) => {
    setCityName(name);
    setEmptyCityNameError(false);
  };

  // When user press the button
  const checkCityName = () => {
    if (!cityName) {
      setEmptyCityNameError(true);
    } else {
      setCityName("");
      setEmptyCityNameError(false);
      setLoading(true);
      setFetchedData(null);
      getCityWeather(cityName);
    }
  };

  // Making the API call.
  const getCityWeather = async (cityName) => {
    setLoading(true);
    // setFetchedData(null);
    const { data, loading, error } = await client.query({
      query: CITY_QUERY,
      variables: { cityName },
    });
    setFetchedData(data);
    setLoading(loading);
    setError(error);
    setEmptyCityNameError(false);
  };

  return (
    <div className="content-container">
      <div>
        <h1 className="header">Weather Info</h1>
        <div className="user-menu">
          <TextField
            className="user-menu_input"
            fullWidth
            label="City Name"
            onChange={(e) => {
              changeCityName(e.target.value);
            }}
            value={cityName}
            error={cityName === "" && emptyCityNameError}
            helperText={
              cityName === "" && emptyCityNameError
                ? "Please insert a city name in english (i.e. tokyo, athens, london, etc)"
                : ""
            }
          />
          <button onClick={checkCityName} className="user-menu_button">
            See Weather
          </button>
        </div>
      </div>
      <div className="history">
        {localStorageData && (
          <p>
            Your last weather search was for city of{" "}
            <button
              onClick={() =>
                getCityWeather(localStorageData.getCityByName.name)
              }
              style={{
                border: "none",
                backgroundColor: "unset",
                fontSize: "inherit",
                textDecoration: "underline",
              }}
            >
              {localStorageData.getCityByName.name}
            </button>
            . Click the name to check it again.
          </p>
        )}
      </div>
      {loading && (
        <div className="spinner">
          <CircularProgress />
        </div>
      )}
      {error && <div className="error">{error.message}</div>}
      {fetchedData && <DisplayData data={fetchedData} />}
    </div>
  );
};

export default App;
