const stateInput = document.getElementById("state-input");
const fetchButton = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

fetchButton.addEventListener("click", async () => {

  const state = stateInput.value.trim();

  if (!state) {
    errorMessage.textContent = "Please enter a state abbreviation";
    return;
  }

  try {

    const response = await fetch(
      `https://api.weather.gov/alerts/active?area=${state}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch alerts");
    }

    const data = await response.json();

    alertsDisplay.innerHTML = "";

    const summary = document.createElement("h3");
    summary.textContent = `${data.title}: ${data.features.length}`;
    alertsDisplay.appendChild(summary);

    data.features.forEach(alert => {
      const p = document.createElement("p");
      p.textContent = alert.properties.headline;
      alertsDisplay.appendChild(p);
    });

    errorMessage.textContent = "";
    errorMessage.classList.add("hidden");
    stateInput.value = "";

  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.classList.remove("hidden");
  }

});