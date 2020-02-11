import gql from 'graphql-tag'
import { ContactFragment } from '../fragments'

export const LoginMutation = gql`
  mutation Login($input: LoginInput) {
    login(input: $input) {
      code
      success
      message
      token
    }
  }
`

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

export const UpdateProfileMutation = gql`
  mutation UpdateProfile($input: ContactInput) {
    updateProfile(input: $input) {
      ...ContactFragment
    }
  }
  ${ContactFragment}
`
