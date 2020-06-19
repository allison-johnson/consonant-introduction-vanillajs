//DOM Getters
let getWorkMat = () => document.getElementById('work-mat');
let getSymbols = () => document.getElementsByClassName('symbol');
let getWorkMatSpaces = () => document.getElementsByClassName('workmat-space');

document.addEventListener('DOMContentLoaded', function() {
  console.log("all symbols: ", getSymbols())

  //Add div's to workmat
  let workMat = getWorkMat();
  for (let i = 0; i < 72; i++) {
    let space = document.createElement('div')
    space.setAttribute("class", "workmat-space")
    workMat.appendChild(space)
  }
  
  //Add dragstart handlers to all symbol pictures
  let allSymbols = getSymbols();
  for (let i = 0; i < allSymbols.length; i++) {
    allSymbols[i].addEventListener("dragstart", function(e) {
      console.log("adding event listener")
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

  let dataTransferInfo = {}
  //Define what should happen when a symbol gets dropped in
  for (let i = 0; i < workMatSpaces.length; i++) {
    workMatSpaces[i].addEventListener("dragover", function(e){
      e.dataTransfer.dropEffect = "move"
      dataTransferInfo = e.dataTransfer 
    })

    workMatSpaces[i].addEventListener("drop", function(e) {
      e.preventDefault();
      e.dropEffect = "move"
      let data = e.dataTransfer.getData("text/plain");
      console.log("dataTransfer on drop: ", e.dataTransfer)
      console.log("dataTransferInfo on drop: ", dataTransferInfo)

      let filePath = data.substring(data.indexOf('/images') + 1)
      let tile = document.createElement('img')
      tile.setAttribute("src", filePath)
      tile.className = "tile"
      tile.setAttribute("position", "relative")
      tile.setAttribute("style", "width:95px;height:95px;position:absolute;")
      //tile.setAttribute("draggable", false)

      e.target.appendChild(tile);

      // tile.addEventListener("dragstart", function(e) {
      //   tileDragStartHandler(e);
      // })
    })
  }
});

function dragStartHandler(e) {
  console.log("drag started")
  e.dataTransfer.setData("text/html", e.target.innerHTML)
  e.dataTransfer.effectAllowed = "move";
}

// function tileDragStartHandler(e) {
//   console.log("drag started")
//   console.log("e.target: ", e.target)
//   e.dataTransfer.setData("text/html", e.target.innerHTML)
//   e.dataTransfer.dropEffect = "move"
// }

window.onload = function() {
  document.onmousedown = startDrag;
  document.onmouseup = stopDrag;
}

function startDrag(e) {
  if (!e) {
    var e = window.event 
  }

  var targ = e.target ? e.target : e.srcElement 

  if(targ.className != "tile") {
    return 
  }

  offsetX = e.clientX;
  offsetY = e.clientY;

  if (!targ.style.left) {
    targ.style.left = '0px'
  }

  if (!targ.style.top) {
    targ.style.top = '0px'
  }

  coordX = parseInt(targ.style.left)
  coordY = parseInt(targ.style.top)
  drag = true 

  document.onmousemove = dragDiv;
}

function stopDrag() {
  drag = false;
}

function dragDiv(e) {
  if (!drag) {
    return
  }
  if (!e) {
    var e = window.event 
  }
  var targ = e.target ? e.target : e.srcElement;
  targ.style.left = coordX + e.clientX - offsetX + 'px'
  targ.style.top = coordY + e.clientY - offsetY + 'px'
  return false 
}



