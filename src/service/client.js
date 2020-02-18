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
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink, createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import AsyncStorage from '@react-native-community/async-storage'

import { GRAPHQL_SERVER_ENDPOINT } from '../resources'

const httpLink = createHttpLink({
  uri: GRAPHQL_SERVER_ENDPOINT,
  credentials: 'include'
})

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('token')
  console.log('Apollo client context token', token)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        )
      if (networkError) console.log(`[Network error]: ${networkError}`)
    }),
    authLink.concat(httpLink)
  ]),
  cache: new InMemoryCache()
})

export default client
