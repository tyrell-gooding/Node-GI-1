const weatherForm = document.querySelector("form");
const input = document.querySelector("input");
const messageOne = document.querySelector("#messageOne");
const messageTwo = document.querySelector("#messageTwo");
const select = document.querySelector("select");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = input.value;
  messageOne.textcontent = "loading...";
  messageTwo.textcontent = "";
  fetch(
    "/weather?address=" +
      location +
      "&units=" +
      select.options[select.selectedIndex].value
  ).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        //error handling
        messageOne.textContent = data.error; //printing error (msg) property from data object(response) to dom <p> tag
      } else {
        //if no error, print location and forecast properties from data object to the UI (dom <p> tag)
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
