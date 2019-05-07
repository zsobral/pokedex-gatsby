import React, { useState } from 'react'

import Layout from '../components/Layout'
import Input from '../components/Input'
import PokemonGrid from '../components/PokemonGrid'
import usePokedex from '../hooks/usePokedex'

const IndexPage = () => {
  const [search, setSearch] = useState('')
  const pokedex = usePokedex()
  const byName = name => pokemon =>
    pokemon.name.toLowerCase().includes(name.toLowerCase())

  return (
    <Layout>
      <Input value={search} onChange={e => setSearch(e.target.value)} />
      <PokemonGrid pokemonList={pokedex.filter(byName(search))} />
    </Layout>
  )
}

export default IndexPage
