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
      GuardianPhone
      Address
      School
      Country
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
      GuardianPhone
      Address
      School
      Country
    }
  }
`
