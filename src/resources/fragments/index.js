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

export const AuthFragment = gql`
  fragment AuthFragment on Contact {
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
`

export * from './Applicant'
export * from './Contact'
export * from './Feed'
export * from './Player'
