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
import { AuthFragment, ContactFragment, PlayerFragment } from '../fragments'

export const InitAppMutation = gql`
  mutation InitApp($input: InitAppInput!) {
    initApp(input: $input) {
      ...PlayerFragment
    }
  }
  ${PlayerFragment}
`

export const LoginMutation = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      code
      success
      message
      token
      contact {
        ...AuthFragment
      }
    }
  }
  ${AuthFragment}
`

export const RegisterMutation = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      code
      success
      message
      token
      contact {
        ...AuthFragment
      }
    }
  }
  ${AuthFragment}
`

export const ResetPasswordMutation = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      code
      success
      message
      token
      contact {
        ...AuthFragment
      }
    }
  }
  ${AuthFragment}
`

export const UpdateProfileMutation = gql`
  mutation UpdateProfile($input: ContactInput!) {
    updateProfile(input: $input) {
      ...ContactFragment
    }
  }
  ${ContactFragment}
`

export * from './Applicant'
export * from './Player'
