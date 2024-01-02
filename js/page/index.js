import recipesData from "../../data/recipes.js"
import { ingredientsFilter, totalRecipe, titleAndDescFilter } from "../module/searchHelpers.js"
import { renderCards } from "../template/cards.js"
import { capitalize, clearSearchInput, filterInputXss } from "../utils/utils.js"
import { handleCategorySearchFilter } from "../module/filter.js"

// DOM éléments
const tagsSection = document.getElementById('tags-container')
const filterSection = document.querySelector('section.filter')
const ingredientsListDom = document.getElementById('ingredients-list')
const devicesListDom = document.getElementById('devices-list')
const ustensilsListDom = document.getElementById('ustensils-list')
const searchInput = document.getElementById('search')
const headerForm = document.getElementById('header-form')
const search = document.getElementById('search')
const searchClearBtn = document.querySelector('.header_input-clear-btn')

let searchResult
let tagsList = []

const initPage = () => {
  renderRecipePage(recipesData)
  handleCategorySearchFilter()
  headerForm.addEventListener('click', (e) => {
    e.preventDefault()
  })
  searchClearBtn.addEventListener('click', () => {
    search.value = ''
    renderRecipePage(recipesData)
  })
}

// render cards && total recipe && listFilter
const renderRecipePage = (dataRecipes, inputValue) => {
  renderCards(dataRecipes, inputValue)
  totalRecipe(dataRecipes)
  listFilters(dataRecipes)
}

//  Searchbar banner
searchInput.addEventListener('input', (e) => {
  const input = filterInputXss(e.target.value.trim())
  searchResult = recipesData
  tagsList = []
  tagsSection.innerHTML = ' '

  if (input === null || input.length < 3) {
    renderRecipePage(recipesData, e.target.value)
    return
  }
  if (input !== null && input.length >= 3) {
    const searchWords = input.split(' ')
    const results = new Set()

    titleAndDescFilter(recipesData, searchWords, results)
    ingredientsFilter(recipesData, searchWords, results)

    searchResult = [...results]
    renderRecipePage(searchResult, e.target.value)
  }
})


// recherche avancée renderList
const renderList = (data, listElement, tagType) => {
  const list = [...data]
  listElement.innerHTML = '' // Vide le contenu de l'élément de liste HTML
  list.sort() // Trie la liste alphabétiquement
  list.forEach((item) => {

    // Si l'item figure dans les tags => déplace en haut de la liste et ajoute un bouton de suppression.

    // Si l'item ne figure pas dans les tags => ajoute un eventListener pour ajouter le tag au clic.
    if (tagsList.some((e) => e.tag === item)) {
      const li = document.createElement('li')
      li.className = 'filter_list-li filter_list-li--selected'
      li.textContent = `${item}`
      li.addEventListener('click', () => {

        // Supprime le tag et met à jour la liste des recettes filtrées
        const tags = document.querySelectorAll('.tags')
        tags.forEach((tag) => {
          if (tag.textContent === li.textContent) tag.remove()
        })

        tagsList = tagsList.filter(
          (tagOject) => tagOject.tag !== li.textContent
        )
        if (tagsList.length === 0) {
          filterSection.classList.remove('filter--with-tags')
        }
        clearSearchInput(tagType)
        updateRecipesListThroughTags()
      })
      listElement.prepend(li)
      return
    }
    // Crée un nouvel élément de liste et ajoute un eventListener pour ajouter le tag au clic
    const li = document.createElement('li')
    li.className = 'filter_list-li'
    li.textContent = `${item}`

    li.addEventListener('click', () => {
      tagHandler(item, tagType)
      clearSearchInput(tagType)
      updateRecipesListThroughTags()
    })

    listElement.appendChild(li)
  })
}

// Fonction pour afficher et ajouter des tags
const tagHandler = (tagName, type) => {
  // Crée un nouvel objet tag et l'ajoute à la liste des tags
  const newTag = { tag: tagName, filter: type }
  tagsList.push(newTag)
  filterSection.classList.add('filter--with-tags') // Ajoute une classe pour afficher le filtre avec des tags
  // Crée un élément de tag avec un bouton de suppression et l'ajoute à la section des tags
  const btn = document.createElement('div')
  btn.className = 'tags'
  btn.innerText = `${tagName}`
  const closeImg = document.createElement('img')
  closeImg.src = './assets/icon/cross.svg'
  closeImg.alt = 'croix supprimer le tag'
  closeImg.className = 'tags_cross'
  closeImg.addEventListener('click', () => {
    // Supprime le tag et met à jour la liste des recettes filtrées
    btn.remove()
    tagsList = tagsList.filter((tagOject) => tagOject.tag !== tagName)
    if (tagsList.length === 0) {
      filterSection.classList.remove('filter--with-tags')
    }
    updateRecipesListThroughTags()
  })

  btn.appendChild(closeImg)
  tagsSection.appendChild(btn)
}

// Fonction pour filtrer les recettes par tags
const updateRecipesListThroughTags = () => {
  // Utilise le résultat de la recherche ou la liste complète des recettes
  let initialSearchResult = searchResult || recipesData
  tagsList.forEach((tagObject) => {
    const tagWordsArray = tagObject.tag.split(' ')

    // Filtrage par ingrédients
    if (tagObject.filter === 'ingredients') {
      initialSearchResult = initialSearchResult.filter((recipe) => {
        return recipe.ingredients.some((obj) =>
          tagWordsArray.every((word) => {
            return obj.ingredient.toLowerCase().includes(word.toLowerCase())
          })
        )
      })
    }

    // Filtrage par appareils
    if (tagObject.filter === 'devices') {
      initialSearchResult = initialSearchResult.filter(
        (recipe) => recipe.appliance === tagObject.tag
      )
    }

    // Filtrage par ustensiles
    if (tagObject.filter === 'ustensils') {
      initialSearchResult = initialSearchResult.filter((recipe) => {
        return recipe.ustensils.some(
          (words) => capitalize(words) === tagObject.tag
        )
      })
    }
  })
  renderRecipePage(initialSearchResult)
}

// Fonction pour créer les listes de recherche par tag
const listFilters = (dataRecipes) => {
  setIngredientsList(dataRecipes)
  setdevicesList(dataRecipes)
  setUstensilsList(dataRecipes)
}

// Fonction pour initialiser la liste des ingrédients
const setIngredientsList = (data = recipesData) => {
  const ingredListItem = new Set()
  data.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const formattedString = capitalize(ingredient.ingredient).trim()
      ingredListItem.add(formattedString)
    })
  })

  renderList(ingredListItem, ingredientsListDom, 'ingredients')
}

const setdevicesList = (data = recipesData) => {
  const devicesListItem = new Set()
  data.forEach((recipe) => {
    const formattedString = capitalize(recipe.appliance).trim()
    devicesListItem.add(formattedString)
  })

  renderList(devicesListItem, devicesListDom, 'devices')
}

const setUstensilsList = (data = recipesData) => {
  const ustensilListItem = new Set()
  data.forEach((recipe) => {
    recipe.ustensils.forEach((ustenstil) => {
      const formattedString = capitalize(ustenstil)
      ustensilListItem.add(formattedString)
    })
  })
  renderList(ustensilListItem, ustensilsListDom, 'ustensils')
}

initPage()
