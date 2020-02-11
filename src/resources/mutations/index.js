import gql from 'graphql-tag'

export const RegisterMutation = gql`
  mutation Register($input: RegisterInput) {
    register(input: $input) {
      code
      success
      message
      token
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
  }
`
