import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  //get the current location to set active
  const currentLocation = location.pathname;

  // console.log(currentLocation);

  return (
    <div className="btm-nav btm-nav-sm">
      <button
        onClick={() => {
          navigate("/current");
        }}
        className={`${
          currentLocation === "/current"
            ? "active text-info bg-info/10"
            : "bg-base-200"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${
            currentLocation === "/current" ? "h-8 w-8" : "h-5 w-5"
          } duration-300`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <span
          className={`btm-nav-label ${
            currentLocation === "/current" ? "hidden" : "block"
          }`}
        >
          Current
        </span>
      </button>
      <button
        onClick={() => {
          navigate("/forecast");
        }}
        className={`${
          currentLocation === "/forecast"
            ? "active text-warning bg-warning/10"
            : "bg-base-200"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${
            currentLocation === "/forecast" ? "h-8 w-8" : "h-5 w-5"
          } duration-300`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        <span
          className={`btm-nav-label ${
            currentLocation === "/forecast" ? "hidden" : "block"
          }`}
        >
          Forecast
        </span>
      </button>
    </div>
  );
}
