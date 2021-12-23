let addToy = false;

//grab container
const toyConatiner = document.querySelector("body");

//append usable json to DOM
function appendToys(toys){
  const toyCard = document.createElement('div')
  toyCard.setAttribute("class", "card");
  toyConatiner.append(toyCard);
  const toyName = document.createElement('h2')
  toyName.innerText = toys.name;
  // toyCard.append(toyName);
  const toyImg = document.createElement('img')
  toyImg.src= toys.image
  toyImg.setAttribute("class", "toy-avatar");
  // toyCard.append(toyImg)
  const likes = document.createElement('p')
  likes.innerText=`${toys.likes} Likes`
  // toyCard.append(likes)
  const btn = document.createElement('button')
  btn.innerText= "Like ❤️"
  btn.setAttribute("class", "like-btn")
  btn.setAttribute("id", "[toy_id]")
  btn.addEventListener("click", (e) => {
    likes.innerText= `${toys.likes +=1} Likes`
  })
  // toyCard.append(btn)
  toyCard.append(toyName, toyImg, likes, btn)
}

//fetch request to db return usable json
fetch("http://localhost:3000/toys")
.then((res) => res.json())
.then((toys) => {
toys.forEach((toys) => {
  appendToys(toys)

})
});
//Gather values from submit inputs
document.addEventListener("submit", (e) =>{
  e.preventDefault()
  fetch("http://localhost:3000/toys", {
    method: "post",
    headers: {
      "content-type": "application/json",
      Accept: "application/json"
    },
    
    body: JSON.stringify({
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    })
  });

})

//show / hide add new toy section
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
