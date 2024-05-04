import { useEffect, useState } from "react";
import forcast from "../../assets/forecast.png";
import loading1 from "../../assets/loading-weather.gif";
import loading2 from "../../assets/loading2-weather.gif";
import loading3 from "../../assets/loading3-weather.gif";
import axios from "axios";
import { useSnackbar, closeSnackbar } from "notistack";

//! Components
import Chart from "./components/Chart";
import Input from "./components/Input";

function Forecast({ theme }) {
  // Snackbar
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  //! State
  //? Loading
  const [loading, setLoading] = useState(false);

  //? Select
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [ipAddress, setIpAddress] = useState("");

  //? Data

  const [address, setAddress] = useState({});
  const [weather, setWeather] = useState({
    current: {
      time: "",
      timezone: "",
      temperature_2m: "",
      wind_speed_10m: "",
      latitude: "",
      longitude: "",
    },
    current_units: {
      temperature_2m: "°C",
      wind_speed_10m: "m/s",
    },
    hourly: {
      time: [],
      temperature_2m: [],
      relative_humidity_2m: [],
      wind_speed_10m: [],
    },
    hourly_units: {
      temperature_2m: "°C",
      relative_humidity_2m: "%",
      wind_speed_10m: "m/s",
    },
  });

  //! Fetching Forecast Weather Data
  const handleSearch = () => {
    setLoading(true);
    axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
      )
      .then((res) => {
        const data = res.data;
        setWeather(data);
        console.log(data);
      })
      .finally(() => {
        setLoading(false);
        enqueueSnackbar("Weather Data", {
          variant: "success",
          autoHideDuration: 1000,
        });
      })
      .catch((err) => {
        console.error(err);
        enqueueSnackbar("Error to fetching data", {
          variant: "error",
          autoHideDuration: 2000,
        });
      });
  };

  // Get Single IP Address
  useEffect(() => {
    axios
      .get("https://api.ipify.org?format=json")
      .then((res) => {
        setIpAddress(res.data.ip);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Get Location from IP Address
  useEffect(() => {
    if (ipAddress) {
      setLoading(true);
      axios
        .get(`https://ipapi.co/${ipAddress}/json/`)
        .then((res) => {
          setAddress(res.data);
          setLatitude(res.data.latitude);
          setLongitude(res.data.longitude);
        })
        .finally(() => {
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [ipAddress]);

  return (
    <div className="grid grid-cols-1 gap-4 py-4">
      <div className="flex mx-2 gap-2">
        <img src={forcast} alt="forecast" style={{ width: "128px" }} />
        <h1 className="title text-3xl my-auto font-bold">Weather Forecast</h1>
      </div>
      <div className="flex gap-4 mx-4">
        <Input value={latitude} setValue={setLatitude} label="Latitude" />
        <Input value={longitude} setValue={setLongitude} label="Longitude" />
        <button
          onClick={handleSearch}
          className="btn btn-info text-info-content shadow"
        >
          {loading ? (
            <>
              <span className="loading loading-spinner"></span>
            </>
          ) : (
            "Search"
          )}
        </button>
      </div>
      {loading ? (
        <>
          <div className="flex justify-center items-center h-[70vh]">
            <img
              src={loading2}
              alt="loading"
              style={{ width: "128px" }}
              className="rounded-full border-2 border-info"
            />
          </div>
        </>
      ) : (
        <>
          <div className="my-4">
            <p className="text-xl text-center">
              Time zone :{" "}
              <span className="text-primary font-semibold">
                {address.timezone} {address.utc_offset}
              </span>
            </p>
            <p className="text-xl text-center">
              Address :{" "}
              <span className="text-primary font-semibold">
                {address.city}, {address.country_name}
              </span>
            </p>
          </div>
          {weather.current.time ? (
            <div className="mb-8">
              <Chart weather={weather} theme={theme} />
            </div>
          ) : (
            <div className="flex flex-col gap-2 justify-center items-center h-[50vh]">
              <img
                src={loading1}
                alt="loading"
                style={{ width: "128px" }}
                className="rounded-full border-2 border-info"
              />
              <p className="title">
                Please searching for weather forecast data...
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Forecast;
