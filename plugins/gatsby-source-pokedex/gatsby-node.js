const fs = require('fs-extra')
const path = require('path')

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions

  const pokedex = await fs.readJson(path.resolve(__dirname, './pokedex.json'))

  const processPokemonImage = pokemon => {
    const { name, ext } = path.parse(pokemon.image)
    const absolutePath = path.resolve(__dirname, pokemon.image)
    const data = {
      name,
      ext,
      absolutePath,
      extension: ext.substring(1),
    }
    const nodeData = {
      ...data,
      id: createNodeId(`pokemon-image-${pokemon.id}`),
      children: [],
      internal: {
        type: 'PokemonImage',
        contentDigest: createContentDigest(data),
      },
    }

    return nodeData
  }

  const processPokemon = pokemon => {
    const data = {
      ...pokemon,
      number: pokemon.id,
    }
    const nodeData = {
      ...data,
      id: createNodeId(`pokemon-${pokemon.id}`),
      parent: null,
      children: [],
      internal: {
        type: 'Pokemon',
        contentDigest: createContentDigest(data),
      },
    }
    return nodeData
  }

  for (const pokemon of pokedex) {
    const pokemonNodeData = processPokemon(pokemon)
    const pokemonImageNodeData = processPokemonImage(pokemon)

    pokemonNodeData.image___NODE = pokemonImageNodeData.id

    createNode(pokemonImageNodeData)
    createNode(pokemonNodeData)
  }
}
