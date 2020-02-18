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

export const PlayerFragment = gql`
  fragment PlayerFragment on PlayerResponse {
    code
    success
    message
    player {
      ID
      ContactID
      PlayerID
      DeviceID
      Status
      CreatedDate
      IsParent
      Deleted
      Comment
    }
  }
`

export const PlayersFragment = gql`
  fragment PlayersFragment on PlayersResponse {
    code
    success
    message
    players {
      ID
      ContactID
      PlayerID
      DeviceID
      Status
      CreatedDate
      IsParent
      Deleted
      Comment
    }
  }
`
