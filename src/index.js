let addToy = false;

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

  const url = "http://localhost:3000/toys"

  // GET request
  const fetchAll = () => {
    fetch(url)
      .then(res => res.json())
      .then(toyData => toyCardRendering(toyData))
  }
  fetchAll();


  const toyCollection = document.querySelector("div#toy-collection");

  function toyCardRendering(toyInformation) {
    toyInformation.forEach(toyInfo => {
      const toyCard = document.createElement("div");
      toyCard.classList = "card";

      const h2 = document.createElement("h2")
      h2.textContent = toyInfo.name;

      const img = document.createElement("img")
       img.src = toyInfo.image;
       img.classList = "toy-avatar";

      const p = document.createElement("p")
      p.textContent = toyInfo.likes;

      const likeBtn = document.createElement("button")
      likeBtn.textContent = "Like ❤️";
      likeBtn.classList = "like-btn"
      likeBtn.id = toyInfo.id;

      likeBtn.addEventListener("click", (e) => {
        updateLikes(e);
      })

      toyCard.append(h2, img, p, likeBtn);
      toyCollection.appendChild(toyCard);
    })
  }

  const form = document.querySelector("form#add-toy-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addNewToy(e);
    form.reset();
  })

  function addNewToy(e) {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: e.target.name.value,
        image: e.target.image.value,
        likes: 0
      })
    })
    .then(res => res.json())
    .then(data => toyCardRendering(data))
  }

  function updateLikes(e) {
    const id = e.target.id;
    const prevSib = e.target.previousElementSibling
    const numLikes = parseInt(prevSib.innerText.split(" ")[0]) + 1
    prevSib.innerText = `${numLikes} Likes`;

    fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: numLikes,
      })
    })
    .then(res => res.json())
    .then(data => data)
  }


  // DOMContentLoaded End
});


























// document.addEventListener("DOMContentLoaded", () => {
//   const addBtn = document.querySelector("#new-toy-btn");
//   const toyFormContainer = document.querySelector(".container");
//   addBtn.addEventListener("click", () => {
//     // hide & seek with the form
//     addToy = !addToy;
//     if (addToy) {
//       toyFormContainer.style.display = "block";
//     } else {
//       toyFormContainer.style.display = "none";
//     }
//   });



//   const url = "http://localhost:3000/toys"

//   function fetchAll() {
//     fetch(url)
//       .then(response => response.json())
//       .then(toyData => renderToyCard(toyData))

//   }
//   fetchAll();



//   const toyCollection = document.querySelector("div#toy-collection")


//   function renderToyCard(toyInformation) {
//     toyInformation.forEach(toyInfo => {
//       const toyCard = document.createElement("div");
//       toyCard.classList = "card";

//       const h2 = document.createElement("h2");
//       h2.textContent = toyInfo.name;

//       const img = document.createElement("img")
//       img.src = toyInfo.image;
//       img.classList = "toy-avatar";

//       const p = document.createElement("p");
//       p.textContent = toyInfo.likes;

//       const btn = document.createElement("button");
//       btn.textContent = "Like ❤️"
//       btn.classList = "like-btn";
//       btn.id = toyInfo.id;

//       btn.addEventListener("click", (e) => {
//         onButtonClick(e);
//       })

//       toyCard.append(h2, img, p, btn)
//       toyCollection.appendChild(toyCard)
//     })
//   }



//   const toyForm = document.querySelector("form.add-toy-form")
//   toyForm.addEventListener("submit", (e) => {
//     onFormSubmit(e);
//   })

//   function onFormSubmit(e) {
//     e.preventDefault()

//     let formData = {
//       name: e.target.name.value,
//       image: e.target.image.value,
//       likes: 0
//     }

//     fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Accepts": "application/json"
//       },
//       body: JSON.stringify(formData)
//     })
//       .then(res => res.json())
//       .then(data => renderToyCard(data));
//   }

//   function onButtonClick(e) {
//     let id = e.target.id

//     let prevSib = e.target.previousElementSibling
//     let numLikes = parseInt(prevSib.innerText.split(" ")[0]) + 1

//     // patch request
//     fetch(`${url}/${id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         "Accepts": "application/json"
//       },
//       body: JSON.stringify({
//         likes: numLikes
//       })
//     })
//       .then(res => res.json())
//       .then(data => console.log(data))
//       .catch(error => error.message)

//     prevSib.innerText = `${numLikes} Likes`;
//   }

//   //DOMContentLoaded end
// });

