// maj 1er lettre
export const capitalize = (str) => {
  return (str.charAt(0).toUpperCase() + str.slice(1).toLowerCase())
}

// input search clear
export const clearSearchInput = (inputName) => {
  document.getElementById(`${inputName}-search`).value = ''
}

// caractères spéciaux
export const filterInputXss = (input) => {
  return input.replace(/[<>&"/=]/g, '')
}
