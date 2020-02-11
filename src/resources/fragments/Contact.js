import gql from 'graphql-tag'

export const ContactFragment = gql`
  fragment ContactFragment on ContactResponse {
    code
    success
    message
    contact {
      ContactID
      Phone
      Title
      GivenName
      FamilyName
      Nationality
      Country
      Email
    }
  }
`

export const ContactsFragment = gql`
  fragment ContactsFragment on ContactsResponse {
    code
    success
    message
    contacts {
      ContactID
      Phone
      Title
      GivenName
      FamilyName
      Nationality
      Country
      Email
    }
  }
`
