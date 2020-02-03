import React from 'react'
import styled from 'styled-components/native'
//import { TextInput } from 'react-native-paper'

import { DatePicker, Empty, Picker, Radio } from '../../components'
import { primaryColor } from '../../resources'

const TestScreen = () => {
  return (
    <Container>
      {/* <TextInput mode="outlined" style={{ marginBottom: 20 }} /> */}
      {/* <DatePicker style={{ flex: 1 }} /> */}
      <Picker style={{ width: '100%' }} />
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
