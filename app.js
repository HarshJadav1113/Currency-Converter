const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");

// for(let code in countryList){
//     console.log(code , countryList[code]);
// }
 


for (let select of dropdowns) {
  for (currcode in countryList) {
    let newoption = document.createElement("option");
    newoption.innerText = currcode;
    newoption.value = currcode;

    if (select.name === "from" && currcode == "USD") {
      newoption.selected = "selected";
    } else if (select.name === "to" && currcode === "INR") {
      newoption.selected = "selected";
    }

    select.append(newoption);

    select.addEventListener("change", (evt) => {
      updateflag(evt.target);
    });
  }
}

const updateflag = (element) => {
  let currcode = element.value;
  let countrycode = countryList[currcode];
  let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newsrc;
};



const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtval = amount.value;
  let fromcurr = document.querySelector(".from select").value;
  let tocurr = document.querySelector(".to select").value;
  let msg = document.querySelector(".msg");
  if (amtval === "" || amtval < 1) {
    amtval = 1;
    amount.value = "1";
  }
  // console.log(fromcurr, tocurr);

  const URL = `${BASE_URL}/currencies/${fromcurr.toLowerCase()}.json`;
  let response = await fetch(URL);
  let text = await response.json();
  let rate = text[fromcurr.toLowerCase()][tocurr.toLowerCase()];
  // let rate= text.fromcurr[tocurr];
  // console.log(text);
  // console.log(rate);

  let finalamount = amtval * rate;
  msg.innerText = `${amtval} ${fromcurr} = ${finalamount} ${tocurr}`;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault(); //close other activity when btn is clicked
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});