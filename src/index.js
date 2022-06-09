let addToy = false;
const toyCollectionNode = document.getElementById("toy-collection")
const form = document.querySelector("form")
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
function sendDataObj (method, info) {
  const sendData = {
    method: method,
    headers : {
      "Content-Type":"application/json",
      "Accept":"application/json"
    },
    body : JSON.stringify({
      name: info[0],
      image : info[1],
      likes: 0
    })
  }
  return sendData
}
form.addEventListener("submit",(e)=>{
  e.preventDefault()
  const dataObj =sendDataObj("POST",[e.target.querySelectorAll((".input-text"))[0].value,e.target.querySelectorAll((".input-text"))[1].value])
  fetch("http://localhost:3000/toys",dataObj).then((resp)=>resp.json()).then((data)=>{
    toyNode(data)
  })
})

fetch("http://localhost:3000/toys").then((resp)=>resp.json()).then((data)=>{
  data.forEach(item => {
    toyNode(item)
  });

})

function toyNode(item) {
  const divNode = document.createElement("div")
  const h2Node = document.createElement("h2")
  const imgNode = document.createElement("img")
  const pNode = document.createElement("p")
  const butNode = document.createElement("button")

  divNode.className = "card"
  h2Node.textContent = item.name
  pNode.textContent = item.likes

  imgNode.src = item.image
  imgNode.classList.add("toy-avatar")

  butNode.className = "like-btn"
  butNode.setAttribute("id",item.id)

  divNode.append(h2Node,imgNode,pNode,butNode)
  toyCollectionNode.append(divNode)

  butNode.addEventListener("click",patchReq)

}



function patchReq(e){
   fetch(`http://localhost:3000/toys/${e.target.id}`,{
    method: "PATCH",
    headers : {
      "Content-Type":"application/json",
    },
    body : JSON.stringify({
      "likes": parseInt(e.target.parentNode.querySelector("p").textContent) + 1,
    })
  }).then((response) => response.json()).then(()=>{
    e.target.parentNode.querySelector("p").textContent = parseInt(e.target.parentNode.querySelector("p").textContent) + 1
  })
  }
  
