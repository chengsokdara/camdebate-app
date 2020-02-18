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

export const ApplicantFragment = gql`
  fragment ApplicantFragment on ApplicantResponse {
    code
    success
    message
    applicant {
      ApplicantID
      ContactID
      Level
      Category
      Title
      GivenName
      FamilyName
      Sex
      TshirtSize
      Nationality
      DOB
      Phone
      Email
      Address
      CityProvince
      University
      EnglishSchool
      GuardianPhone
      Paid
    }
  }
`

export const ApplicantsFragment = gql`
  fragment ApplicantsFragment on ApplicantsResponse {
    code
    success
    message
    applicants {
      ApplicantID
      ContactID
      Level
      Category
      Title
      GivenName
      FamilyName
      Sex
      TshirtSize
      Nationality
      DOB
      Phone
      Email
      Address
      CityProvince
      University
      EnglishSchool
      GuardianPhone
      Paid
    }
  }
`
