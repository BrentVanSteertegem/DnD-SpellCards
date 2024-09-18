const BASE_URL = 'https://www.dnd5eapi.co'

export const getAllSpells = async () => {
  const spellIndexes = await fetch(BASE_URL + '/api/spells').then((response) =>
    response.json()
  )

  return Promise.all(
    spellIndexes.results.map((index: any) =>
      fetch(BASE_URL + index.url).then((response) => response.json())
    )
  )
}