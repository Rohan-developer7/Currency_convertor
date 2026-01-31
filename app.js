const BASE_URL = "https://open.er-api.com/v6/latest";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate dropdowns
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let option = document.createElement("option");
    option.value = currCode;
    option.innerText = currCode;

    if (select.name === "from" && currCode === "USD") {
      option.selected = true;
    }
    if (select.name === "to" && currCode === "INR") {
      option.selected = true;
    }

    select.append(option);
  }

  select.addEventListener("change", (e) => updateFlag(e.target));
}

// Update flag
const updateFlag = (element) => {
  let countryCode = countryList[element.value];
  let img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};

// Fetch & update exchange rate
const updateExchangeRate = async () => {
  const amountInput = document.querySelector(".amount input");
  let amount = amountInput.value || 1;

  const URL = `${BASE_URL}/${fromCurr.value}`;
  msg.innerText = "Fetching exchange rate...";

  try {
    const response = await fetch(URL);
    const data = await response.json();

    const rate = data.rates[toCurr.value];
    const finalAmount = (amount * rate).toFixed(2);

    msg.innerText =
      `${amount} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  } catch (error) {
    msg.innerText = "Error fetching data ❌";
    console.error(error);
  }
};

// Events
btn.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", updateExchangeRate);
