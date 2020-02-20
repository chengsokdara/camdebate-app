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
import { MenusFragment } from '../fragments'

export const MenusQuery = gql`
  query MenusQuery {
    menus {
      ...MenusFragment
    }
  }
  ${MenusFragment}
`
