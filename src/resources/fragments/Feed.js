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
