import React, { useContext, useState } from "react";

import { CurrentDayWeather } from "../components/CurrentDayWeather";
import { MapBox } from "../components/MapBox";
import { useHttp } from "../hooks/httpHook";
import { AuthContext } from "../context/authContext";

export const MainWeather = () => {
  const [data, setData] = useState(null);
  const [input, setInput] = useState("");
  const { token } = useContext(AuthContext);
  const { request } = useHttp();

  const pressHandler = async (event) => {
    if (event.key === "Enter") {
      try {
        const data = await request(`/api/weather/${input}`, "GET", null, {
          Authorization: `Bearer ${token}`,
        });

        setData(data);
      } catch (e) {}
    }
  };

  return (
    <div
      style={{
        height: "100px",
        display: "flex",
        justifyContent: "center",
        marginTop: "75px",
      }}
    >
      <div
        className="input-field"
        style={{
          height: "100px",
        }}
      >
        <input
          placeholder="City name"
          id="city"
          type="text"
          value={input}
          autoFocus={true}
          onKeyPress={pressHandler}
          onChange={(e) => setInput(e.target.value)}
        />
        <label htmlFor="city">Enter city name prs enter</label>
      </div>
      <CurrentDayWeather data={data} />
      {data && (
        <MapBox latitude={data.data.latitude} longitude={data.data.longitude} />
      )}
    </div>
  );
};
