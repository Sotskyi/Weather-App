import React from "react";

export const CurrentDayWeather = ({ data }) => {
  if (data) {
    return (
      <div
        className="center-align"
        style={{ width: "400px", marginTop: "100px", position: "absolute" }}
      >
        <div className="col s12 m7">
          <h2 className="header">{data.data.city}</h2>
          <div className="card horizontal">
            <div className="card-image">
              <img
                style={{ borderRadius: "10px" }}
                src="https://lorempixel.com/100/190/nature/6"
                alt=""
              />
            </div>
            <div className="card-stacked">
              <div className="card-content yellow lighten-5">
                <p className="left-align"> temp--{data.data.temp}</p>
                <p className="left-align">min temp--{data.data.tempMin}</p>
                <p className="left-align">max temp--{data.data.tempMax}</p>
                <p className="left-align">humidity--{data.data.humidity}%</p>

                <p className="left-align">wind --{data.data.wind} mph</p>
              </div>
              <div style={{ padding: "0px" }} className="card-action">
                <div className="yellow lighten-5">{data.data.currentDay}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <div></div>;
};
