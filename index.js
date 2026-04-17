if (typeof document !== "undefined") {

const stateInput = document.getElementById("state-input");
const getAlertsButton = document.getElementById("get-alerts");
const alertsContainer = document.getElementById("alerts-container");
const errorMessage = document.getElementById("error-message");


async function fetchWeatherAlerts(state) {

  try {

    const response = await fetch(
      `https://api.weather.gov/alerts/active?area=${state}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch alerts");
    }

    const data = await response.json();

    displayAlerts(data);

    errorMessage.textContent = "";

  }

  catch (error) {

    errorMessage.textContent = error.message;

  }

}


function displayAlerts(data) {

  alertsContainer.innerHTML = "";

  const summary = document.createElement("h3");

  summary.textContent =
    `${data.title}: ${data.features.length}`;

  alertsContainer.appendChild(summary);


  data.features.forEach(alert => {

    const alertItem = document.createElement("p");

    alertItem.textContent =
      alert.properties.headline;

    alertsContainer.appendChild(alertItem);

  });

}


getAlertsButton.addEventListener("click", () => {

  const state = stateInput.value.trim();

  if (!state) {

    errorMessage.textContent =
      "Please enter a state abbreviation";

    return;

  }

  fetchWeatherAlerts(state);

  stateInput.value = "";

});
}