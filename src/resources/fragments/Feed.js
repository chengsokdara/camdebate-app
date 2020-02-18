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

export const FeedFragment = gql`
  fragment FeedFragment on FeedResponse {
    code
    success
    message
    feed {
      FeedID
      CoverUrl
      CoverCaption
      Title
      SubTitle
      Message
      TableTitle
      TableData
      ListTitle
      ListData
      Note
      NoteUrl
      Announcement
    }
  }
`

export const FeedsFragment = gql`
  fragment FeedsFragment on FeedsResponse {
    code
    success
    message
    feeds {
      FeedID
      CoverUrl
      CoverCaption
      Title
      SubTitle
      Message
      TableTitle
      TableData
      ListTitle
      ListData
      Note
      NoteUrl
      Announcement
    }
  }
`
