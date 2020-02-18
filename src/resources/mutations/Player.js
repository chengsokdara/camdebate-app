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
import { PlayerFragment } from '../fragments'

export const CreatePlayerMutation = gql`
  mutation CreatePlayer($input: PlayerInput!) {
    createPlayer(input: $input) {
      ...PlayerFragment
    }
  }
  ${PlayerFragment}
`

export const UpdatePlayerMutation = gql`
  mutation UpdatePlayer($ID: Int!, $input: PlayerInput!) {
    updatePlayer(ID: $ID, input: $input) {
      ...PlayerFragment
    }
  }
  ${PlayerFragment}
`
