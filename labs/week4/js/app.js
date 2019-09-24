var container = document.querySelector("#container");
var top = document.querySelector("#top");

var i = 0;
for (i = 0; i < 6; i++) {
  //We know we have a specific combination of suit + value

  //create and customize the element
  let newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.style.animationDelay = i * 0.1 + "s";

  //set up connections and events
  newCard.addEventListener("mouseover", onCardOver);
  newCard.addEventListener("mouseout", onCardOut);
  newCard.addEventListener("mousedown", onCardExit);

  //put onto the page
  container.appendChild(newCard);
}

function onCardOver(event) {
  event.target.style.animationDelay = "0s";
  event.target.classList.add("cardOver");
  event.target.classList.remove("cardOut");
}

function onCardOut(event) {
  event.target.classList.add("cardOut");
  event.target.classList.remove("cardOver");
}

function onCardExit(event) {
  event.target.classList.add("cardExit");
}
