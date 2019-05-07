import { graphql, useStaticQuery } from 'gatsby'

const usePokedex = () => {
  const data = useStaticQuery(graphql`
    query {
      allPokemon {
        nodes {
          number
          name
          type
          image {
            childImageSharp {
              fixed(width: 125, height: 125) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  `)

  return data.allPokemon.nodes
}

export default usePokedex
