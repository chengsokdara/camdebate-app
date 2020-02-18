/**
 * Author: Mr. Cheng Sokdara
 * Repository: https://github.com/chengsokdara/camdebate-app
 *
 * Email: chengsokdara@gmail.com
 * Phone: 086558716
 * Website: https://rawewhat-team.web.app
 * License: MIT
 *
 * Created At: 03/02/2020
 */
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
