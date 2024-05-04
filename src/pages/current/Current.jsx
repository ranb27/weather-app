import { useState, useEffect } from "react";
import current from "../../assets/current.png";
import axios from "axios";
import loading2 from "../../assets/loading2-weather.gif";
import { useSnackbar, closeSnackbar } from "notistack";
import cold from "../../assets/cold.png";
import relax from "../../assets/relax.png";
import hot from "../../assets/hot.png";

//! Components
import Card from "./components/Card";

import Input from "./components/Input";

export default function Current() {
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
  });

  //! Fetching Current Weather Data
  const handleSearch = () => {
    if (latitude !== null && longitude !== null) {
      setLoading(true);
      axios
        .get(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
        )
        .then((res) => {
          setWeather(res.data);
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
        });
    } else {
      enqueueSnackbar("Please input latitude and longitude", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  // // Get Initial Location
  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     setLatitude(position.coords.latitude);
  //     setLongitude(position.coords.longitude);
  //   });
  // }, []);

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
        <img src={current} alt="current" style={{ width: "128px" }} />
        <h1 className="title text-3xl my-auto font-bold">Current Weather</h1>
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
        <div className="flex justify-center items-center h-[50vh]">
          <img
            src={loading2}
            alt="loading"
            style={{ width: "128px" }}
            className="rounded-full"
          />
        </div>
      ) : (
        <>
          <Card weather={weather} address={address} />
          <div className="grid gap-2 mb-12">
            {weather.current.time !== "" ? (
              <>
                <h2 className="font-bold text-center">Weather Condition</h2>
                <div className="grid grid-cols-3 gap-4 mx-2">
                  <div
                    className={`${
                      weather.current.temperature_2m < 20
                        ? "bg-info/25 animate-pulse"
                        : "bg-base-100"
                    } card shadow-lg`}
                  >
                    <div className="card-body flex justify-center items-center">
                      <img src={cold} alt="cold" className="rounded-lg w-24" />
                      <h2 className="card-title mx-auto">Cold</h2>
                    </div>
                  </div>
                  <div
                    className={`${
                      weather.current.temperature_2m > 20 &&
                      weather.current.temperature_2m < 30
                        ? "bg-success/25 animate-pulse"
                        : "bg-base-100"
                    } card shadow-lg`}
                  >
                    <div className="card-body flex justify-center items-center">
                      <img
                        src={relax}
                        alt="relax"
                        className="rounded-lg w-24"
                      />
                      <h2 className="card-title mx-auto">Relax</h2>
                    </div>
                  </div>
                  <div
                    className={`${
                      weather.current.temperature_2m > 30
                        ? "bg-error/50 animate-pulse"
                        : "bg-base-100"
                    } card shadow-lg`}
                  >
                    <div className="card-body flex justify-center items-center">
                      <img src={hot} alt="hot" className="rounded-lg w-24" />
                      <h2 className="card-title mx-auto">Hot</h2>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}
