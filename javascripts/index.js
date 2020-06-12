//DOM Getters
let getWorkMat = () => document.getElementById('work-mat');
let getSymbols = () => document.getElementsByClassName('symbol');
let getWorkMatSpaces = () => document.getElementsByClassName('workmat-space');

document.addEventListener('DOMContentLoaded', function() {
  //Add dragstart handlers to all symbol pictures
  let allSymbols = getSymbols();
  for (let i = 0; i < allSymbols.length; i++) {
    allSymbols[i].addEventListener("dragstart", function(e) {
      dragStartHandler(e);
    })
  }//for

  //Define drop zones
  let workMatSpaces = getWorkMatSpaces();
  for (let i = 0; i < workMatSpaces.length; i++) {
    workMatSpaces[i].addEventListener("dragover", function(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
    })
  }

  //Define what should happen when a symbol gets dropped in
  for (let i = 0; i < workMatSpaces.length; i++) {
    workMatSpaces[i].addEventListener("drop", function(e) {
      e.preventDefault();
      let data = e.dataTransfer.getData("text/plain");
      console.log("data on drop: ", data)
      let filePath = data.substring(data.indexOf('/images') + 1)
      console.log("filePath: ", filePath)
      let tile = document.createElement('img')
      tile.setAttribute("src", filePath)
      tile.setAttribute("style", "width:65px;height:65px;position:absolute;")
      e.target.appendChild(tile);
    })
  }
});

function dragStartHandler(e) {
  console.log("drag started")
  e.dataTransfer.setData("text/html", e.target.innerHTML)
  e.dataTransfer.dropEffect = "copy";
}

