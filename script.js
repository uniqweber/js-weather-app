const apiKEY = "5c3f18c278ffcc8f4f27d7ed963c0249";
const submitBtn = document.getElementById("submitBtn");
const cityName = document.getElementById("cityName");
const errorMsg = document.getElementById("error");

const showTemp = document.getElementById("temp");
const showCity = document.getElementById("city");
const showHmdt = document.getElementById("humidity");
const showWind = document.getElementById("wind");
const weatherImg = document.getElementById("weatherImg");
const infoBox = document.getElementById("infoBox");
const showDay = document.getElementById("day");
const showTime = document.getElementById("time");
const showAP = document.getElementById("am-pm");

const dates = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

setInterval(() => {
  const today = new Date();
  const day = today.getDay();
  let hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();
  const amPm = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12 || 12;

  // Format minutes and seconds to always be two digits
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  showDay.innerText = dates[day];
  showTime.innerText = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  showAP.innerText = amPm;
}, 1000);

submitBtn.addEventListener("click", async function getWeather() {
  if (!cityName.value) {
    errorMsg.classList.remove("hidden");
    cityName.value = "";
    return;
  }
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKEY}&units=metric`;

  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    if (data.cod == 404) {
      errorMsg.classList.remove("hidden");
      infoBox.classList.add("hidden");
      cityName.value = "";
      showCity.innerText = "";
      showTemp.innerText = "";
      showHmdt.innerText = "";
      showWind.innerText = "";
      weatherImg.src = "";
    } else {
      errorMsg.classList.add("hidden");
      infoBox.classList.remove("hidden");
      const showImg = data.weather[0].main;
      showCity.innerText = data.name;
      showTemp.innerText = data.main?.temp;
      showHmdt.innerText = data.main?.humidity;
      showWind.innerText = data.wind?.speed;
      if (showImg == "Clear") {
        weatherImg.src = "./assets/clear.png";
      } else if (showImg === "Clouds") {
        weatherImg.src = "./assets/clouds.png";
      } else if (showImg === "Drizzle") {
        weatherImg.src = "./assets/drizzle.png";
      } else if (showImg === "Mist") {
        weatherImg.src = "./assets/mist.png";
      } else if (showImg === "Rain") {
        weatherImg.src = "./assets/rain.png";
      } else if (showImg === "Snow") {
        weatherImg.src = "./assets/snow.png";
      } else{
        weatherImg.src = "./assets/clear.png"
      }
      cityName.value = "";
    }
  } catch (error) {
    console.log(error);
  }
});
