import gql from 'graphql-tag'

export const ContactFragment = gql`
  fragment ContactFragment on ContactResponse {
    code
    success
    message
    contact {
      ContactID
      Title
      GivenName
      FamilyName
      Sex
      Nationality
      DOB
      Phone
      Email
      WorkPlace
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
      Title
      GivenName
      FamilyName
      Sex
      Nationality
      DOB
      Phone
      Email
      WorkPlace
    }
  }
`
