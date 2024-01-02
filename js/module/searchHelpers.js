// recherche les titres et descriptions
const titleAndDescFilter= (data, searchWords, mergedResults) => {
  data.forEach((recipe) => {
    if (
      searchWords.every((word) => {
        return (
          recipe.name.toLowerCase().includes(word.toLowerCase()) ||
          recipe.description.toLowerCase().includes(word.toLowerCase())
        )
      })
    ) {
      mergedResults.add(recipe)
    }
  })
}

// recherche dans les listes d'ingrédients
const ingredientsFilter = (data, searchWords, mergedResults) => {
  const ingredientsResults = data.filter((recipe) => {
    return recipe.ingredients.some((obj) =>

      searchWords.every((word) => {
        return obj.ingredient.toLowerCase().includes(word.toLowerCase())
      })
    )
  })

  ingredientsResults.forEach((recipe) => mergedResults.add(recipe))
}

// total des recettes affichées
const totalRecipe = (data) => {
  const recipeCounter = document.getElementById('recipeCounter')
  recipeCounter.innerText = `${data.length} recettes`
}

export { ingredientsFilter, totalRecipe, titleAndDescFilter }
