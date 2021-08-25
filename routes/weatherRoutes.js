const { Router } = require("express");
const router = Router();
const fetch = require("node-fetch");

const config = require("config");
const auth = require("../middleware/authMiddleware");

router.get("/:city", auth, async (req, res) => {
  try {
    const city = req.params.city;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${config.get(
        "openWeatherKey"
      )}`
    );
    const json = await response.json();
    const d = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDay = days[d.getDay()];

    const data = {
      temp: json.main.temp,
      tempMin: json.main.temp_min,
      tempMax: json.main.temp_max,
      pressure: json.main.pressure,
      humidity: json.main.humidity,
      wind: json.wind.speed,
      currentDay,
      city: json.name,
      longitude: json.coord.lon,
      latitude: json.coord.lat,
    };

    res.json({ data });
  } catch (e) {
    res.status(500).json({ message: "something wrong try again" });
  }
});
module.exports = router;
