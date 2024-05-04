import React from "react";
import wind from "../../../assets/wind-icon.svg";
import LandscapeIcon from "@mui/icons-material/Landscape";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function Card({ weather, address }) {
  //format date time to yyyy-mm-dd hh:mm:ss realated to the current time zone utc_offset
  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="mx-4">
      {weather.current.time !== "" ? (
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">
              Current
              <span className="text-primary">
                {formatDate(weather.current.time)}
              </span>
            </h2>
            <p className="text-lg">
              Time zone :{" "}
              <span className="text-primary">
                {address.timezone} {address.utc_offset}
              </span>
            </p>

            <p className="text-lg">
              Country :{" "}
              <span className="text-primary">
                {address.country_name}, {address.country_code}
              </span>
            </p>
            <p className="text-lg">
              City : <span className="text-primary">{address.city}</span>
            </p>

            <div className="flex text-2xl font-semibold justify-center w-fit gap-4">
              <p className="flex items-center gap-4 ">
                <LocationOnIcon sx={{ fontSize: "48px" }} />
                <span className="text-primary">
                  {weather.latitude},{weather.longitude}
                </span>
              </p>

              <p className="flex items-center gap-4">
                <LandscapeIcon sx={{ fontSize: "48px" }} />
                <span className="text-primary">{weather.elevation}</span>
              </p>
            </div>
            <div className="grid my-1 text-center gap-4 font-bold">
              <p
                className={`text-6xl ${
                  weather.current.temperature_2m < 20
                    ? "text-info"
                    : weather.current.temperature_2m > 20 &&
                      weather.current.temperature_2m < 30
                    ? "text-success"
                    : weather.current.temperature_2m > 30
                    ? "text-warning"
                    : "text-primary"
                }`}
              >
                {weather.current.temperature_2m}{" "}
                {weather.current_units.temperature_2m}
              </p>
              <p className="text-4xl flex justify-center gap-2 text-secondary/50">
                <img
                  src={wind}
                  alt="wind"
                  className="w-12 h-12 bg-secondary/25 p-2 rounded-badge"
                />
                {weather.current.wind_speed_10m}{" "}
                {weather.current_units.wind_speed_10m}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Current Weather</h2>
            <p className="text-center font-semibold my-4 text-accent animate-pulse">
              Please enter the latitude and longitude to get the current weather
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
