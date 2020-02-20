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

export const MenuFragment = gql`
  fragment MenuFragment on MenuResponse {
    code
    success
    message
    menu {
      MenuID
      Title
      Url
      Screen
      Order
      Visitor
      Visible
      Deleted
    }
  }
`

export const MenusFragment = gql`
  fragment MenusFragment on MenusResponse {
    code
    success
    message
    menus {
      MenuID
      Title
      Url
      Screen
      Order
      Visitor
      Visible
      Deleted
    }
  }
`
