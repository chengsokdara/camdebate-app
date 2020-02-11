import gql from 'graphql-tag'
import { ContactFragment } from '../fragments'

export const ProfileQuery = gql`
  query Profile {
    profile {
      ...ContactFragment
    }
  }
  ${ContactFragment}
`

export * from './Feed'
