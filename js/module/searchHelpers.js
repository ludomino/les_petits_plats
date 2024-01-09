// recherche les titres et descriptions
const titleAndDescFilter = (data, searchWords, results) => {
  for (let i = 0; i < data.length; i++) {
    const recipe = data[i]
    if (
      searchWords.every((word) => {
        return (
          recipe.name.toLowerCase().includes(word.toLowerCase()) ||
          recipe.description.toLowerCase().includes(word.toLowerCase())
        )
      })
    ) {
      results.add(recipe)
    }
  }
}

// recherche dans les listes d'ingrédients
const ingredientsFilter = (data, searchWords, results) => {
    for (let i = 0; i < data.length; i++) {
      const recipe = data[i];
      for (let j = 0; j < recipe.ingredients.length; j++) {
        const obj = recipe.ingredients[j]
        if (
          searchWords.every((word) => {
            return obj.ingredient.toLowerCase().includes(word.toLowerCase())
          })
        ) {
          results.add(recipe)
          break // Break the inner loop if a match is found
        }
      }
    }
  }

// total des recettes affichées
const totalRecipe = (data) => {
  const recipeCounter = document.getElementById('recipeCounter')
  recipeCounter.innerText = `${data.length} recettes`
}

export { ingredientsFilter, totalRecipe, titleAndDescFilter }
