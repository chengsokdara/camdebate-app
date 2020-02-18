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
import { ApplicantFragment } from '../fragments'

export const CreateApplicantMutation = gql`
  mutation CreateApplicant($input: ApplicantInput!) {
    createApplicant(input: $input) {
      ...ApplicantFragment
    }
  }
  ${ApplicantFragment}
`
