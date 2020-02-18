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
import React, { useRef } from 'react'
import styled from 'styled-components/native'
import { Text, View } from 'react-native'
//import { TextInput } from 'react-native-paper'

import { DatePicker, Empty, Picker, Radio } from '../../components'
import { primaryColor } from '../../resources'

const TestScreen = () => {
  const childrenIds = useRef()
  return (
    <Container
      onStartShouldSetResponder={evt => {
        evt.persist()
        if (childrenIds.current && childrenIds.current.length) {
          if (childrenIds.current.includes(evt.target)) {
            return
          }
          console.log('Tapped outside')
        }
      }}>
      <View style={{ backgroundColor: 'blue' }}>
        <View
          ref={component => {
            childrenIds.current = component._children[0]._children.map(
              el => el._nativeTag
            )
          }}
          style={{ backgroundColor: 'red' }}>
          <View>
            <Text>Option 1</Text>
            <Text>Option 2</Text>
          </View>
        </View>
        <View>
          <Text>
            Tapping in this view will trigger the console log, but tapping
            inside the view above will not.
          </Text>
        </View>
      </View>
      {/* <TextInput mode="outlined" style={{ marginBottom: 20 }} /> */}
      {/* <DatePicker style={{ flex: 1 }} /> */}
      {/* <Picker style={{ width: '100%' }} /> */}
      {/* <Radio
        activeColor={primaryColor}
        items={[
          {
            label: 'First',
            value: 'first'
          },
          {
            label: 'Second',
            value: 'second'
          },
          {
            label: 'Third',
            value: 'third'
          }
        ]}
        label="Categories"
        value="first"
        onChange={value => console.log('Radio onChange', value)}
      /> */}
      {/* <Empty /> */}
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #d5d5d5;
`

export default TestScreen
