// ----------------------------------------------------
// Fonction display des articles
// ----------------------------------------------------

const renderCards = (recipesData, inputValue) => {
  const articleSection = document.getElementById('card-container')

  if (!recipesData || recipesData.length === 0) {
    articleSection.innerHTML = `<p class="cards-container_no-match-msg">Aucune recette ne contient <span class="cards-container_span">‘${inputValue} ’</span> </br> vous pouvez chercher «
tarte aux pommes », « poisson », etc.<p>`
    return
  }
  articleSection.innerHTML = ' '
  recipesData.forEach((data) => {
    const card = getCardDom(data)
    articleSection.appendChild(card)
  })
}

// -----------------------------------------------------------
// Fonction création de card
// -----------------------------------------------------------

const getCardDom = (data) => {
  const { image, name, ingredients, description, time } = data
  const imgUrl = `./assets/photos/${image}`
  const fragment = document.createDocumentFragment()
  const article = document.createElement('article')
  article.className = 'card'
  article.innerHTML = `
  <span class="card_timer">${time}min</span>
  <div class="card_img-wrapper">
  <img src="${imgUrl}" alt="${name}" class="card_img">
  </div>

 <h2 class="card_title">${name}</h2>
 <p  class="card_recipe">RECETTE</p>
 <p class="card_details">${description}</p>
 <p class="card_ingredients">INGRÉDIENTS</p>`

  const ingredientsWrapper = document.createElement('div')
  ingredientsWrapper.className = 'card_ingredients-wrapper'

  // Boucle pour générer le détails des ingrédients ----------

  ingredients.forEach((elt) => {
    const div = document.createElement('div')
    div.className = 'card_ingredient-details'
    let quantityHtml = ''
    if (elt.quantity) {
      quantityHtml = `
      <p>${elt.quantity}${elt.unit || ''}</p>`
    } else {
      quantityHtml = '<span>-</span>'
    }
    div.innerHTML = `
      <p>${elt.ingredient}</p>${quantityHtml}`

    ingredientsWrapper.appendChild(div)
  })

  article.appendChild(ingredientsWrapper)
  // Fragment pour optimiser la performance --------------------
  fragment.appendChild(article)
  return fragment
}

export { renderCards }
