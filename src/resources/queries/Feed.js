import gql from 'graphql-tag'
import { FeedFragment, FeedsFragment } from '../fragments'

export const FeedsQuery = gql`
  query FeedsQuery {
    feeds {
      ...FeedsFragment
    }
  }
  ${FeedsFragment}
`
