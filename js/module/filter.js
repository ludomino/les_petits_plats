import { filterInputXss } from './../utils/utils.js'

// DOM Filter ingredients
const ingredientsBtn = document.getElementById('ingredients-btn')
const ingredientsSearch = document.getElementById('ingredients-search')
const ingredientsFilterDom = document.getElementById('ingredients-filter')

// DOM Filter devices
const devicesBtn = document.getElementById('devices-btn')
const devicesSearch = document.getElementById('devices-search')
const devicesFilterDom = document.getElementById('devices-filter')

// DOM Filter ustensils
const ustensilBtn = document.getElementById('ustensils-btn')
const ustensilsSearch = document.getElementById('ustensils-search')
const ustensilsFilterDom = document.getElementById('ustensils-filter')

// display dropdown
const expandList = (filterType) => {
  document
    .getElementById(`${filterType}-chevron`)
    .classList.toggle('filter_chevron--up')
  document
    .getElementById(`${filterType}-filter`)
    .classList.toggle('filter_is-collapsed')
}

// fermer dropdown
const hideList = (filterType) => {
  document
    .getElementById(`${filterType}-chevron`)
    .classList.remove('filter_chevron--up')
  document
    .getElementById(`${filterType}-filter`)
    .classList.remove('filter_is-collapsed')
}

ingredientsBtn.addEventListener('click', () => {
  expandList('ingredients')
  hideList('devices')
  hideList('ustensils')
})
devicesBtn.addEventListener('click', () => {
  expandList('devices')
  hideList('ingredients')
  hideList('ustensils')
})
ustensilBtn.addEventListener('click', () => {
  expandList('ustensils')
  hideList('devices')
  hideList('ingredients')
})

// Ferme les dropdowns et clear la recherche si clic externe
document.addEventListener('click', (e) => {
  const isClickInsideInsideInputIngredients = ingredientsFilterDom.contains(
    e.target
  )
  const isClickInsideInsideInputDevices = devicesFilterDom.contains(e.target)
  const isClickInsideInsideInputUstensils = ustensilsFilterDom.contains(
    e.target
  )
  const filterBoxes = document.querySelectorAll('.filter_container')
  const filterCollapsed = document.querySelector('.filter_is-collapsed')
  const filterCollapsedChevron = document.querySelector('.filter_chevron--up')

  const isClickInsideInsideDropDow = Array.from(filterBoxes).some((box) =>
    box.contains(e.target)
  )
  if (!isClickInsideInsideDropDow && filterCollapsed !== null) {
    filterCollapsedChevron.classList.remove('filter_chevron--up')
    filterCollapsed.classList.remove('filter_is-collapsed')
  }
  if (!isClickInsideInsideInputIngredients) {
    ingredientsSearch.value = ''
    filterListDisplay('ingredients', '')
  }
  if (!isClickInsideInsideInputDevices) {
    devicesSearch.value = ''
    filterListDisplay('devices', '')
  }
  if (!isClickInsideInsideInputUstensils) {
    ustensilsSearch.value = ''
    filterListDisplay('ustensils', '')
  }
})

// recherche par catégorie ingrédient / appareil / ustensils
const handleCategorySearchFilter = () => {
  ingredientsSearch.addEventListener('input', (e) => {
    const input = filterInputXss(e.target.value)
    filterListDisplay('ingredients', input)
  })
  devicesSearch.addEventListener('input', (e) => {
    const input = filterInputXss(e.target.value)
    filterListDisplay('devices', input)
  })
  ustensilsSearch.addEventListener('input', (e) => {
    const input = filterInputXss(e.target.value)
    filterListDisplay('ustensils', input)
  })
}

// affiche ou cache des listes pour la recherche par catégorie
const filterListDisplay = (category, e) => {
  const listOfLi = document.querySelectorAll(
    `#${category}-list li:not(.filter_list-li--selected)`
  )
  listOfLi.forEach((li) => {
    if (!li.textContent.toLowerCase().includes(e.toLowerCase())) {
      li.style.display = 'none'
    }
    if (li.textContent.toLowerCase().includes(e.toLowerCase())) {
      li.style.display = 'block'
    }
  })
}

export { handleCategorySearchFilter }
