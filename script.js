let cardWrapper = document.querySelector(".films__card-wrapper")
let elTemplate = document.querySelector("#template").content
let elFormSelect = document.querySelector(".films__select")
let elForm = document.querySelector(".form")
let elFormInput = document.querySelector(".films__input-serach")
let elModal = document.querySelector(".modal")
let modalClose = elModal.querySelector(".modal__close-btn")

modalClose.addEventListener("click", () => {
  elModal.classList.remove("modal-active")
}) 

window.addEventListener("click", e => {
  if(e.target == elModal){
    elModal.classList.remove("modal-active")
  }
})

elForm.addEventListener("submit", e => {
  e.preventDefault()

let reges = new RegExp(elFormInput.value, "gi")

let searchFilm = films.filter(item => item.title.match(reges))

let filteredFilm = []

if(elFormSelect.value == "All"){
  filteredFilm = searchFilm
} else {
  filteredFilm = searchFilm.filter(item => item.genres.includes(elFormSelect.value))
}

console.log(filteredFilm);

renderArr(filteredFilm, cardWrapper)
})


function renderGenre(arr, list) {
  let myArr = []
  arr.map(item => {
    item.genres.map(g => {
      if (!myArr.includes(g)) {
        myArr.push(g)
      }
    })
  })

  myArr.map(item => {
    let newOption = document.createElement("option")

    newOption.textContent = item
    newOption.value = item

    list.appendChild(newOption)
  })
}


renderGenre(films, elFormSelect)


function renderArr(arr, list) {
  list.innerHTML = null 
  arr.map(item => {
    let cloneTemplate = elTemplate.cloneNode(true)

    cloneTemplate.querySelector(".films__img").src = item.poster
    cloneTemplate.querySelector(".films__card-title").textContent = item.title
    cloneTemplate.querySelector(".films__release-date").textContent = myDate(item.
    release__date)

    let filmsBtn = cloneTemplate.querySelector(".films__btn")
    filmsBtn.dataset.ID = item.id

    filmsBtn.addEventListener("click", e => {
      elModal.classList.add("modal-active")

      let filmId = e.target.dataset.ID

      if(filmId == item.id){
        elModal.querySelector("img").src = item.poster
        elModal.querySelector(".modal__title").textContent = item.title
        elModal.querySelector(".modal__description").textContent = item.overview

        let genre = elModal.querySelector(".genre__list")
        genre.innerHTML = null 
        item.genres.map(ge =>{
          let newLi = document.createElement("li")
          newLi.textContent = ge 
          genre.appendChild(newLi)
        })
      }
    })
      

    console.log(filmsBtn);

    list.appendChild(cloneTemplate)
  })
}

renderArr(films, cardWrapper)