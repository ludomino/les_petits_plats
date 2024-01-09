// recherche les titres et descriptions
const titleAndDescFilter = (data, searchWords, results) => {
  data.forEach((recipe) => {
    const lowerCaseName = recipe.name.toLowerCase()
    const lowerCaseDescription = recipe.description.toLowerCase()

    if (
      searchWords.every((word) => {
        return (
          lowerCaseName.includes(word.toLowerCase()) ||
          lowerCaseDescription.includes(word.toLowerCase())
        )
      })
    ) {
      results.add(recipe)
    }
  })
}

// recherche dans les listes d'ingrédients
const ingredientsFilter = (data, searchWords, results) => {
  const ingredientsResults = data.filter((recipe) => {
    return recipe.ingredients.some((obj) =>
      searchWords.every((word) =>
        obj.ingredient.toLowerCase().includes(word.toLowerCase())
      )
    )
  })

  ingredientsResults.forEach((recipe) => results.add(recipe))
}

// total des recettes affichées
const totalRecipe = (data) => {
  const recipeCounter = document.getElementById('recipeCounter')
  recipeCounter.innerText = `${data.length} recettes`
}

export { ingredientsFilter, totalRecipe, titleAndDescFilter }
