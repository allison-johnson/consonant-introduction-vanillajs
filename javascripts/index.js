//DOM Getters
let getWorkMat = () => document.getElementById('work-mat');
let getSymbols = () => document.getElementsByClassName('symbol');
let getMouthPics = () => document.getElementsByClassName('mouth-pic');
let getWorkMatSpaces = () => document.getElementsByClassName('workmat-space');
let getClearButton = () => document.getElementById('clear-button');
let getTrashButton = () => document.getElementById('trash-button');

document.addEventListener('DOMContentLoaded', function() {
  console.log("all symbols: ", getSymbols())

  //Add div's to workmat
  let workMat = getWorkMat();
  for (let i = 0; i < 72; i++) {
    let space = document.createElement('div')
    space.setAttribute("class", "workmat-space")
    workMat.appendChild(space)
  }
  
  //Add dragstart handlers to all symbol pictures (actually not necessary, they're draggable by default?)
  //Add ability to hide to all symbol pictures
  let allSymbols = getSymbols();
  for (let i = 0; i < allSymbols.length; i++) {
    // allSymbols[i].addEventListener("dragstart", function(e) {
    //   console.log("adding event listener")
    //   dragStartHandler(e);
    // })

    allSymbols[i].addEventListener("click", function(e) {
      clickHandler(e);
    })
  }//for

  //Add ability to hide to all mouth pics
  let allMouthPics = getMouthPics();
  for (let i = 0; i < allMouthPics.length; i++) {
    allMouthPics[i].addEventListener("click", function(e) {
      clickHandler(e);
    })
  }

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
    })
  }

  //Add functionality to clear work mat button
  let clearButton = getClearButton();
  clearButton.addEventListener("click", function(e) {
    //Clear child elements from all divs in grid
    let workMatSpaces = getWorkMatSpaces();
    for (let i = 0; i < workMatSpaces.length; i++) {
      workMatSpaces[i].innerHTML = '';
    }
  })

  //Add functionality to trash button
  
});

function clickHandler(e) {
  e.target.classList.toggle("hidden")
}

function dragStartHandler(e) {
  console.log("drag started")
  e.dataTransfer.setData("text/html", e.target.innerHTML)
  e.dataTransfer.effectAllowed = "move";
}

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
    targ.style.left = offsetX + 10 + 'px'
  }

  if (!targ.style.top) {
    targ.style.top = offsetY + 10 +'px' 
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

// WZoom.create('#work-mat', {
//   type: 'html',
//   width: 900,
//   height: 800
// });

// var defaults = {
//   type: 'html',
//   width: '900px',
//   height: '800px',
//   dragScrollable: true,
//   dragScrollableOptions: {
//     smoothExtinction: false,
//     onGrab: null,
//     onMove: null,
//     onDrop: null 
//   },
//   maxScale: 1,
//   speed: 10
// }

// const wzoom = WZoom.create('html')
// document.querySelector('[data-zoom-up]').addEventListener('click', () => {
//   wzoom.zoomUp();
// })

// document.querySelector('[data-zoom-down]').addEventListener('click', () => {
//   wzoom.zoomDown();
// })

// window.addEventListener('resize', () => {
//   wzoom.prepare();
// })


// var elt = document.querySelector('#mouth-pics')
// panzoom(elt)
