import React, { memo } from 'react'
import { css } from '@emotion/core'
import isEqual from 'lodash/fp/isEqual'

import PokemonCard from './PokemonCard'

const styles = {
  grid: css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, auto));
    grid-gap: 16px;
  `,
}

const PokemonGrid = ({ pokemonList }) => {
  return (
    <>
      <div css={styles.grid}>
        {pokemonList.map(pokemon => (
          <PokemonCard key={pokemon.number} pokemon={pokemon} />
        ))}
      </div>
    </>
  )
}

const propsAreEqual = (prevProps, nextProps) =>
  isEqual(prevProps.pokemonList, nextProps.pokemonList)

export default memo(PokemonGrid, propsAreEqual)
