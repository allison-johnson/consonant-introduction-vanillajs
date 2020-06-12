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

  //Define symbol drop zone
//   let workMat = getWorkMat();
//   workMat.addEventListener("dragover", function(e) {
//     e.preventDefault();
//     e.dataTransfer.dropEffect = "move";
//   })

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
      e.target.appendChild(tile);
    //   e.target.appendChild(document.getElementById(data));
    })
  }


  //Define what should happen when a symbol gets dropped in
//   workMat.addEventListener("drop", function(e) {
//       e.preventDefault();
//       console.log("imaged dropped")

//       //Get element that was dragged
//       let html = e.dataTransfer.getData("text/html");
//     //   const draggableElement = document.getElementById(id);
//       console.log("html: ", html)
//       const quoteOne = html.indexOf('"')
//       console.log("quoteOne: ", quoteOne)
//       const strippedString = html.substring(quoteOne + 1)
//       console.log("strippedString: ", strippedString)
//       let quoteTwo = strippedString.indexOf('"')
//       quoteTwo = quoteOne + quoteTwo
//       const src = html.substring(quoteOne + 1, quoteTwo + 1)
//       console.log("src: ", src)

//       //Make a copy of the dragged element and give it its own ID
//     //   let nodeCopy = draggableElement.cloneNode(true);
//     //   nodeCopy.id = `${id}-copy`;

//       //Create an element with this information
//       let img = document.createElement('img')
//       img.setAttribute("src", src)
//     //   let altText = nodeCopy.querySelector('alt').innerText;
//     //   let p = document.createElement('p');
//     //   p.innerText = altText;

//       //Append the new element to the work mat
//       //e.target.appendChild(p);
//       workMat.innerHTML += img
//       console.log(img)
//   })
});

function dragStartHandler(e) {
  console.log("drag started")
  //e.dataTransfer.setData("text/plain", e.target.id)
  debugger 
  e.dataTransfer.setData("text/html", e.target.innerHTML)
  e.dataTransfer.dropEffect = "copy";
}

